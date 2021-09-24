
  import * as config from './configurations';
  
  export interface ITrackingService {      
      trackMenus(action: keyof tracking.MenuEventTypes, props?: tracking.CorePropsOptions): void;      
  }

  export class TrackingService implements ITrackingService {

      public static $inject = [
          'cpCoreService',
          // 'trackingServiceApi',
      ];

      constructor(
          private cpCoreService: Services.ICPCoreService,
          // private trackingServiceApi: { useClass: },
      ) { }



      trackMenus(action: keyof tracking.TrackingMenuEventTypes, props?: tracking.TrackingCorePropsOptions): void {
          let trackingData;
          let trackingKeys = [];

          if (["AssignClick", "ElectronicallySignClick", "BannerSignClick", "ModalAddClick", "ModalDiscardClick", "ModalCancelClick", "ModalSaveClick"].indexOf(action) >= 0) {
              trackingKeys = [...trackingKeys, ...tracking.TrackingCoreKeyCombos.CpState_UserAccess]
          }

          trackingData = this.getCoreTrackingDataByKeys(trackingKeys);

          if (props) { //for things that can't be acquired in this service as a "core data"
              trackingData = { ...trackingData, ...props }; 
          }

          this.mixPanelService.trackEvent(tracking.TrackingSignatoryEvents[action], trackingData);
      }

      private getCoreTrackingDataByKeys(keys: Array<string>): object {
          let data = {};

          keys.forEach((key) => {
              switch (key) {
                  case tracking.TrackingCoreEventKeys.Cp.State: {
                      data[key] = this.formatService.formatStatus(Number(this.cpCoreService.model.CP.Status));
                      break;
                  }
                  case tracking.TrackingCoreEventKeys.Cp.Type: {
                      data[key] = this.cpCoreService.model.CP.IsProforma ? "Proforma" : "CP";
                      break;
                  }
                  case tracking.TrackingCoreEventKeys.User.AccessControl: {
                      data[key] = this.formatService.formatUserPermission(this.cpCoreService.model.CurrentUserPermission.Permission);
                      break;
                  }
              }
          });

          return data
      }

      trackCpApprovals(action: keyof tracking.TrackingCpApprovalEventTypes, props?: tracking.TrackingCorePropsOptions): void {
          let trackingData;
          let trackingKeys = [];

          if ([
              "ApproveClick",
              "ApproveClickOnCpBanner",
              "CancelApprovalClick",
              "ChangeApproversClick",
              "CpDetailsStartApprovalClick",
              "HistoricalCpClick",
              "HistoricalSectionClick",
              "ModalAddClick",
              "ModalCancelClick",
              "ModalDeleteClick",
              "ModalDiscardClick",
              "ModalDismissClick",
              "ModalDoneClick",
              "ModalSaveClick",
              "RejectClick",
              "RejectClickOnCpBanner",
              "RevisionsButtonClick",
              "StartApprovalClick",
              "VoidApprovalClick",
          ].indexOf(action) != -1) {
              trackingKeys = [...trackingKeys, ...[tracking.TrackingCoreEventKeys.User.AccessControl]]
          }

          if ([
              "CancelApprovalClick",
              "CpDetailsStartApprovalClick",
              "HistoricalCpClick",
              "HistoricalSectionClick",
              "ModalSaveClick",
              "RevisionsButtonClick",
              "StartApprovalClick",
          ].indexOf(action) != -1) {
              trackingKeys = [...trackingKeys, ...[tracking.TrackingCoreEventKeys.Cp.State]]
          }

          trackingData = this.getCoreTrackingDataByKeys(trackingKeys);

          if (props) { //for things that can't be acquired in this service as a "core data"
              trackingData = { ...trackingData, ...props };
          }

          this.mixPanelService.trackEvent(tracking.TrackingCpApprovalEvents[action], trackingData);
      }
  }
}
