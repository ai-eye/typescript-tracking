module Clarksons.CPM.Tracking {

  /*  Core/Common PROPS used more than one place */
  declare type TrackingCorePropTypes = 'CP Approval Datetime' | 'Version number of CP';
  export declare type TrackingCorePropsOptions = Partial<{ [key in TrackingCorePropTypes]: any }>;

  /*  TrackingCoreEventKeys:
   *  These can used exclusively from trackingService.ts without the 
   *  client having to pass values as "props" */

  export const TrackingCoreEventKeys = {
      User: {
          Name: 'User Name',
          Dept:  'User Department'
      }     
  }

  /*  Combos:  Common Combinations of tracking keys */
  export const TrackingCoreKeyCombos = {
      Name_Dept: [TrackingCoreEventKeys.User.Name, TrackingCoreEventKeys.User.Dept]
  }

  /*  SIGNATORIES */
  const TOP_MENU_PREFIX = 'CP Approvals Overview';
  const FOOTER_MENU_PREFIX = 'CP Editor Banner';

  export const TrackingSignatoryEvents = {
      //CP Signature Assign Signatories Modal
      ModalAddClick: `${SIGNATORY_MODAL_PREFIX} Add Click`,
      ModalCancelClick: `${SIGNATORY_MODAL_PREFIX} Cancel Click`,
      ModalDeleteClick: `${SIGNATORY_MODAL_PREFIX} Delete Click`,
      ModalDiscardClick: `${SIGNATORY_MODAL_PREFIX} Discard Click`,
      ModalDismissClick: `${SIGNATORY_MODAL_PREFIX} Dismiss Click`,
      ModalDoneClick: `${SIGNATORY_MODAL_PREFIX} Done Signatory Click`,
      ModalEditClick: `${SIGNATORY_MODAL_PREFIX} Edit Click`,
      ModalSaveClick: `${SIGNATORY_MODAL_PREFIX} Save Click`,

      //CP Approvals Overview
      AssignClick: `${SIGNATORY_APPROVALS_PREFIX} Assign Signatories Kebab Click`,
      ChangeClick: `${SIGNATORY_APPROVALS_PREFIX} Change Signatories Kebab Click`,
      ElectronicallySignClick: `${SIGNATORY_APPROVALS_PREFIX} Electronically Sign Click`,

      //CP Editor Banner
      BannerSignClick: `${SIGNATORY_BANNER_PREFIX} Electronically Sign Click`,

      //CP Signature Status
      StatusChangeClick: `${SIGNATORY_STATUS_PREFIX} Change Click`,
      StatusDeleteClick: `${SIGNATORY_STATUS_PREFIX} Delete click`,
      StatusEditClick: `${SIGNATORY_STATUS_PREFIX} Edit Click`,
  }

  export declare type TrackingSignatoryEventTypes = typeof TrackingSignatoryEvents;
  export declare type TrackingSignatoryPropTypes = 'Signatory Company Value' | 'Signatory Value' | 'Signatory Role' | 'Signature Service Value';
  export declare type TrackingSignatoryPropsOptions = Partial<{ [key in TrackingSignatoryPropTypes | TrackingCorePropTypes]: any }>;

  /*  APPROVALS */
  const CP_APPROVALS_PREFIX = 'CP Approvals';
  const APPROVALS_MODAL_PREFIX = 'Assign Approvers Modal';

  export const TrackingCpApprovalEvents = {

      //  Assign Approvals Modal
      ModalAddClick: `${APPROVALS_MODAL_PREFIX} Add Click`,
      ModalCancelClick: `${APPROVALS_MODAL_PREFIX} Cancel Click`,
      ModalDeleteClick: `${APPROVALS_MODAL_PREFIX} Delete Click`,
      ModalDiscardClick: `${APPROVALS_MODAL_PREFIX} Discard Click`,
      ModalDismissClick: `${APPROVALS_MODAL_PREFIX} Dismiss Click`,
      ModalDoneClick: `${APPROVALS_MODAL_PREFIX} Done Click`,
      ModalEditClick: `${APPROVALS_MODAL_PREFIX} Edit Click`,
      ModalSaveClick: `${APPROVALS_MODAL_PREFIX} Save Click`,

      CpDetailsStartApprovalClick: `CP Details Start Approval Button Click`,

      //  CP Approvals
      ApproveClick: `${CP_APPROVALS_PREFIX} Approve Click`,
      ApproveClickOnCpBanner: `${CP_APPROVALS_PREFIX} Approve Click On CP Banner`,
      CancelApprovalClick: `${CP_APPROVALS_PREFIX} Cancel Approval Click`,
      ChangeApproversClick: `${CP_APPROVALS_PREFIX} Change Approvers Click`,
      HistoricalCpClick: `${CP_APPROVALS_PREFIX} Historical CP Click`,
      HistoricalSectionClick: `${CP_APPROVALS_PREFIX} Historical Section Click`,
      RejectClick: `${CP_APPROVALS_PREFIX} Reject Click`,
      RejectClickOnCpBanner: `${CP_APPROVALS_PREFIX} Reject Click On CP Banner`,
      RevisionsButtonClick: `${CP_APPROVALS_PREFIX} Revisions Button Click`,
      StartApprovalClick: `${CP_APPROVALS_PREFIX} Start Approval Button Click`,
      VoidApprovalClick: `${CP_APPROVALS_PREFIX} Void Approval Click`,
  }

  export declare type TrackingCpApprovalEventTypes = typeof TrackingCpApprovalEvents;
  export declare type TrackingApproverPropTypes = 'Approver Company value' | 'Approver (person) value' | 'Approver role value';
  export declare type TrackingApproverPropsOptions = Partial<{ [key in TrackingApproverPropTypes | TrackingCorePropTypes]: any }>;

}