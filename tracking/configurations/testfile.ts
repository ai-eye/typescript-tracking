///Destructure?

import Bootstrap = angular.ui.bootstrap;
import Tracking = Clarksons.CPM.Tracking;

export class ApprovalsSignaturesModalController {
  public static $inject = [
    '$uibModalInstance',
    'observerFactory',
    'signatories',
    '$timeout',
    'trackingService',
  ];

  editorMode: boolean;
  addSignatoryOptionsEnabled: boolean;

  user;
  role;
  company;

  typeAheadCompanyId: number = 0;
  typeaheadClearCompany: false;
  typeaheadClearUser: false;

  modalDiv = 'divModalApprovalsSignatories';

  store = {
    signatories: Array<Models.Signatory>(),
  };

  roles;
  modalTitle;

  actionTypes = {
    cancelIconClicked: 'cancelIconClicked',
    companySelected: 'companySelected',
    userSelected: 'userSelected',
    deleteIconClicked: 'deleteIconClicked',
    enterANewSignatoryBtnClicked: 'enterANewSignatoryBtnClicked',
    requestAddToList: 'requestAddToList',
    saveBtnClicked: 'saveBtnClicked',
    successAddToList: 'successAddToList',
  };

  hadExistingSignatories: boolean;
  saveBtnDisabled: boolean;

  elementsByName = {
    company: 'inputTypeaheadCompany',
    user: 'inputTypeaheadUser',
    role: 'selectSignatoryRole',
  };

  constructor(
    public $uibModalInstance: Bootstrap.IModalServiceInstance,
    public observerFactory: Clarksons.CPM.Factories.ObserverFactory,
    public signatories: Models.Signatory[],
    private readonly $timeout: ng.ITimeoutService,
    private trackingService: Clarksons.CPM.Services.ITrackingService
  ) {
    this.roles = [
      { RoleName: 'Charterer', id: 1 },
      { RoleName: 'Owner', id: 2 },
    ];
    this.modalTitle = 'Assign Signatories';

    this.hadExistingSignatories = signatories.length > 0;

    if (this.hadExistingSignatories) {
      this.editorMode = false;
      this.addSignatoryOptionsEnabled = true;
      this.store.signatories = angular.copy(signatories);
      this.applyshowAsDisabledLogic();
    } else {
      this.editorMode = true;
      this.$timeout(
        () =>
          this.setFocusOn(
            this.getModalElementByName(this.elementsByName.company)
          ),
        500
      );
    }

    this.applySaveBtnDisabledLogic();
  }

  private applyshowAsDisabledLogic() {
    this.store.signatories = this.store.signatories.map((a, b) => {
      a.showAsDisabled = a.signedStatusName.toLowerCase() !== 'pending';
      return a;
    });
  }

  private applySaveBtnDisabledLogic() {
    if (this.hadExistingSignatories) {
      const newSignatories = this.store.signatories.filter(
        (o) =>
          !this.signatories.find((o2) => o.systemUserId === o2.systemUserId)
      );
      const hasChanged =
        newSignatories.length > 0 ||
        this.store.signatories.length != this.signatories.length;
      this.saveBtnDisabled = this.editorMode || !hasChanged;
    } else {
      this.saveBtnDisabled =
        this.editorMode ||
        (this.store.signatories.length === 0 && this.signatories.length === 0);
    }
  }

  onClickCancelBtn = () => {
    this.trackingService.trackSignatories('ModalCancelClick');
    this.$uibModalInstance.dismiss('cancel');
  };

  onClickCancelIcon = () => {
    //discard at current row entering of inputs via "X" icon next to "Tick"
    this.trackingService.trackSignatories('ModalDiscardClick');
    this.action(this.actionTypes.cancelIconClicked, null);
  };

  private trackingMapSignatoryToProps = (
    signatory: Models.Signatory
  ): Tracking.TrackingSignatoryPropsOptions => {
    const props: Tracking.TrackingSignatoryPropsOptions = {
      'Signatory Company Value': signatory.companyName,
      'Signatory Role': signatory.role,
      'Signatory Value': signatory.fullName,
    };
    return props;
  };

  onClickDeleteIcon = (signatory: Models.Signatory) => {
    this.trackingService.trackSignatories(
      'ModalDeleteClick',
      this.trackingMapSignatoryToProps(signatory)
    );
    this.action(this.actionTypes.deleteIconClicked, signatory);
  };

  onClickDoneIcon = (signatory: Models.Signatory) => {
    this.action(this.actionTypes.requestAddToList, null);
  };

  onClickModalXIcon = () => {
    this.trackingService.trackSignatories('ModalDismissClick');
    this.$uibModalInstance.dismiss('cancel');
  };

  onClickNewSignatoryIcon = () => {
    this.trackingService.trackSignatories('ModalAddClick');
    this.action(this.actionTypes.enterANewSignatoryBtnClicked, null);
  };

  onClickSaveBtn = () => {
    this.trackingService.trackSignatories('ModalSaveClick');
    this.action(this.actionTypes.saveBtnClicked, null);
  };

  onSelectedCompany = (company) =>
    this.action(this.actionTypes.companySelected, company);
  onSelectedUser = (userModel) =>
    this.action(this.actionTypes.userSelected, userModel);

  private action(actionType: string, payload: any) {
    switch (actionType) {
      case this.actionTypes.companySelected: {
        this.company = payload;
        this.user = null;
        this.role = null;
        this.typeAheadCompanyId = this.company.CompanyId;
        break;
      }
      case this.actionTypes.userSelected: {
        this.user = payload;
        break;
      }
      case this.actionTypes.cancelIconClicked: {
        this.user = null;
        this.company = null;
        this.role = null;
        this.observerFactory.publish(
          Clarksons.CPM.Events.TYPEAHEAD_USER_REMOVED,
          null
        );
        this.editorMode = false;
        this.addSignatoryOptionsEnabled = true;
        break;
      }
      case this.actionTypes.deleteIconClicked: {
        this.store.signatories = this.store.signatories.filter(
          (x) => x.systemUserUid !== payload.systemUserUid
        );
        break;
      }
      case this.actionTypes.enterANewSignatoryBtnClicked: { //show the entry row
        this.user = null;
        this.role = null;
        this.editorMode = true;
        this.addSignatoryOptionsEnabled = false;
        this.$timeout(
          () =>
            this.setFocusOn(
              this.getModalElementByName(this.elementsByName.company)
            ),
          500
        );
        break;
      }
      case this.actionTypes.saveBtnClicked: {
        this.$uibModalInstance.close(this.store.signatories);
        break;
      }
      case this.actionTypes.requestAddToList: {
        if (this.isValidEntry()) {
          const signatory = new Approvals.Models.Signatory();
          signatory.systemUserUid = this.user.SystemUserUid;
          signatory.systemUserId = this.user.SystemUserId;
          signatory.fullName = this.user.FirstName + ' ' + this.user.LastName;
          signatory.companyId = this.company.CompanyUid;
          signatory.companyName = this.company.CompanyName;
          signatory.role = this.role.RoleName;
          signatory.signedStatusId = 2;
          signatory.signedStatusName = 'Pending';
          this.store.signatories = this.store.signatories.concat(signatory);

          this.trackingService.trackSignatories(
            'ModalDoneClick',
            this.trackingMapSignatoryToProps(signatory)
          );
          this.action(this.actionTypes.successAddToList, null);
        }
        break;
      }
      case this.actionTypes.successAddToList: {
        this.editorMode = false;
        this.addSignatoryOptionsEnabled = true;
        this.observerFactory.publish(
          Clarksons.CPM.Events.TYPEAHEAD_USER_ADDED,
          null
        );
        break;
      }
    }
    this.applySaveBtnDisabledLogic();
    this.applyshowAsDisabledLogic();
  }

  private isValidEntry(): boolean {
    let errEls = [];

    ['company', 'user', 'role'].forEach((el) => {
      const jEl = this.getModalElementByName(this.elementsByName[el]);
      $(jEl).removeClass('error');
      if (this[el] === undefined || this[el] === null) errEls.push(jEl);
    });

    errEls.forEach((el) => $(el).addClass('error'));

    if (errEls.length === 0) return true;

    this.setFocusOn(errEls[0]);

    return false;
  }

  private setFocusOn(el) {
    this.$timeout(() => {
      if (el) el.focus();
    }, 50);
  }

  private getModalElementByName(elName) {
    const el = $('#' + this.modalDiv).find('[name$="' + elName + '"]');
    return el.length === 1 ? el[0] : null;
  }
}
