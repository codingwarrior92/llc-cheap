import { Injectable, TemplateRef, OnDestroy } from '@angular/core';

// BOOTSTRAP
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

// SERVICES
import { SessionStorage } from '../session-storage/session-storage.service';
import { LocalStorage } from '../local-storage/local-storage.service';

// RXJS
import { BehaviorSubject, Subscription } from 'rxjs';

// HAMMER
import { HammerService } from '../hammer/hammer.service';

@Injectable()
export class ModalService implements OnDestroy {
  modalRef: BsModalRef;

  config = {
    animated: true,
    backdrop: 'static'
  };
  createListsModal: TemplateRef<any>;
  phonePasscodeModal: TemplateRef<any>;
  selectListsModal: TemplateRef<any>;
  shareListModal: TemplateRef<any>;
  watchListsPopupModal: TemplateRef<any>;
  messageModal: TemplateRef<any>;
  confirmationModal: TemplateRef<any>;
  editAccountModal: TemplateRef<any>;
  editAvatarModal: TemplateRef<any>;
  editEmailModal: TemplateRef<any>;
  retypePasswordModal: TemplateRef<any>;
  changePasswordModal: TemplateRef<any>;
  twoFactorAuthenticationModal: TemplateRef<any>;
  addPaymentMethodModal: TemplateRef<any>;
  editPaymentMethodModal: TemplateRef<any>;
  chargeDueModal: TemplateRef<any>;
  planListModal: TemplateRef<any>;
  createListOptionsModal: TemplateRef<any>;
  editLabelModal: TemplateRef<any>;
  changeLabelModal: TemplateRef<any>;
  filterListsModal: TemplateRef<any>;

  // DATA
  data$: BehaviorSubject<any> = new BehaviorSubject(null);
  watchList$: BehaviorSubject<any> = new BehaviorSubject(null);

  // OBJECT
  obj: any = {};

  // STRING
  selectedModal: string;

  // SUBSCRIPTIONS
  modalCloseSubscription: Subscription;

  constructor(
    private modalService: BsModalService,
    private LS: LocalStorage,
    private SS: SessionStorage,
    private hammerService: HammerService
  ) { }

  ngOnDestroy() {
    if (this.modalCloseSubscription) {
      this.modalCloseSubscription.unsubscribe();
    }
  }

  private showModal(template: TemplateRef<any>, config) {
    this.modalRef = this.modalService.show(template, config);

    this.modalCloseSubscription = this.modalService.onHidden.subscribe((reason: string) => {
      if (reason === 'backdrop-click') {
        this.resetInitialState();
      }
    });

    if (this.modalRef) {
      const listoptionsElement = document.getElementById(this.selectedModal);

      this.hammerService.SwipeLeftDownClose(listoptionsElement).subscribe(data => {
        if (data.swipe === 'down') {
          this.close();
        }
        if (data.swipe === 'left') {
          this.close();
          history.pushState(null, null, location.href);
        }
      });
    }
  }

  fetchModalData() {
    return this.data$;
  }

  openCreateListsModal(config) {
    this.selectedModal = 'createlist';
    if (this.createListsModal) {
      config['class'] = 'create__list__popup';
      config.animated = true;
      this.showModal(this.createListsModal, config);
    }
  }

  openPhonePasscodeModal(config) {
    this.selectedModal = 'phonePasscodeModal';
    if (this.phonePasscodeModal) {
      config.animated = true;

      this.showModal(this.phonePasscodeModal, config);
    }
  }

  openSelectListsModal(config) {
    if (this.selectListsModal) {
      config['class'] = 'list__select__popup';
      config.animated = true;

      this.showModal(this.selectListsModal, config);
    }
  }

  openListOptionsModal(config) {
    // for accessing element by id
    this.selectedModal = 'listoptions'
    if (this.createListOptionsModal) {
      config['class'] = 'list__options__popup';
      config.animated = true;

      this.showModal(this.createListOptionsModal, config);
    }
  }

  openEditLabelModal(config) {
    if (this.editLabelModal) {
      config['class'] = 'edit__label__options__popup';
      this.showModal(this.editLabelModal, config);
    }
  }

  openChangeLabelModal(config) {
    if (this.changeLabelModal) {
      config['class'] = 'change__label__options__popup';
      this.showModal(this.changeLabelModal, config);
    }
  }

  openFilterListsModal(config) {
    if (this.filterListsModal) {
      config['class'] = 'filter__lists__options__popup';
      config.animated = true;

      this.showModal(this.filterListsModal, config);
    }
  }

  openWatchListsModal(config) {
    if (this.watchListsPopupModal) {
      config['class'] = 'watchlists__popup';
      config.animated = true;

      this.showModal(this.watchListsPopupModal, config);
    }
  }

  openMessageModal(config) {
    if (this.messageModal) {
      config['class'] = 'message__popup';
      config.animated = true;

      this.showModal(this.messageModal, config);
    }
  }

  openConfirmationModal(config) {
    if (this.confirmationModal) {
      config['class'] = 'confirmation__popup';
      config.animated = true;

      this.showModal(this.confirmationModal, config);
    }
  }

  openShareListModal(config) {
    this.selectedModal = 'shareListModal';
    if (this.shareListModal) {
      config['class'] = 'share__list__popup';
      config.animated = true;

      this.showModal(this.shareListModal, config);
    }
  }

  openEditAccountModal(config) {
    config.animated = true;
    if (this.editAccountModal) {
      this.selectedModal = 'EDIT_ACCOUNT';
      let verified: boolean = this._checkUserVerifiedPassword(config);

      if (verified) {
        config['class'] = 'edit__account__popup';
        this.showModal(this.editAccountModal, config);
      } else {
        this.openRetypePasswordModal(config);
      }
    }
  }

  openEditEmailModal(config) {
    if (this.editEmailModal) {
      this.selectedModal = 'EDIT_EMAIL';
      config.animated = true;

      let verified: boolean = this._checkUserVerifiedPassword(config);

      if (verified) {
        this.showModal(this.editEmailModal, config);
      } else {
        this.openRetypePasswordModal(config);
      }
    }
  }

  openEditAvatarModal(config) {
    if (this.editAvatarModal) {
      this.selectedModal = 'EDIT_AVATAR';
      let verified: boolean = this._checkUserVerifiedPassword(config);

      if (verified) {
        config['class'] = 'edit__avatar__popup';
        config.animated = true;

        this.showModal(this.editAvatarModal, config);
      } else {
        this.openRetypePasswordModal(config);
      }
    }
  }

  openChargeDueModal(config) {
    if (this.chargeDueModal) {
      this.selectedModal = 'CHARGE_DUE';
      config.animated = true;
      let verified: boolean = this._checkUserVerifiedPassword(config);

      if (verified) {
        this.showModal(this.chargeDueModal, config);
      } else {
        this.openRetypePasswordModal(config);
      }
    }
  }

  openPlanListModal(config) {
    if (this.planListModal) {
      this.selectedModal = 'PLAN_LIST';
      let verified: boolean = this._checkUserVerifiedPassword(config);

      if (verified) {
        config['class'] = 'planList__popup';
        config.animated = true;

        this.showModal(this.planListModal, config);
      } else {
        this.openRetypePasswordModal(config);
      }
    }
  }

  openConfirmCancelSubscriptionModal(config: any) {
    if (this.confirmationModal) {
      this.selectedModal = 'CANCEL_SUBSCRIPTION';
      config.animated = true;

      let verified: boolean = this._checkUserVerifiedPassword(config);

      if (verified) {
        config['class'] = 'confirmation__popup';

        this.showModal(this.confirmationModal, config);
      } else {
        this.openRetypePasswordModal(config);
      }
    }
  }

  openRetypePasswordModal(config: any) {
    let passwordVerification: string = this.SS.get('password_verification');
    let loginType: string = this.LS.get('login_type');
    config.animated = true;


    if (loginType && loginType === 'google' && passwordVerification === null) {
      let message: any = this.processModalAlertInformation('verify-jwt', 'confirmed');
      this.data$.next(message);
    } else if (this.retypePasswordModal) {
      this.selectedModal = 'retypePasswordModal';
      this.showModal(this.retypePasswordModal, config);
    }
  }

  openTwoFactorAuthenticationdModal(config) {
    config.animated = true;

    if (this.twoFactorAuthenticationModal) {
      this.selectedModal = 'EDIT_TWO_FACTOR_AUTHENTICATION';
      let verified: boolean = this._checkUserVerifiedPassword(config);

      if (verified) {
        this.showModal(this.twoFactorAuthenticationModal, config);
      } else {
        this.openRetypePasswordModal(config);
      }
    }
  }

  openChangePasswordModal(config) {
    config.animated = true;

    if (this.changePasswordModal) {
      this.selectedModal = 'EDIT_PASSWORD';
      let verified: boolean = this._checkUserVerifiedPassword(config);

      if (verified) {
        this.showModal(this.changePasswordModal, config);
      } else {
        this.openRetypePasswordModal(config);
      }
    }
  }

  openAddPaymentMethodModal(config) {
    config.animated = true;

    if (this.addPaymentMethodModal) {
      this.selectedModal = 'ADD_PAYMENT_METHOD';
      let verified: boolean = this._checkUserVerifiedPassword(config);

      if (verified) {
        config['class'] = 'add__payment__popup';
        this.showModal(this.addPaymentMethodModal, config);
      } else {
        this.openRetypePasswordModal(config);
      }
    }
  }

  openEditPaymentMethodModal(config) {
    config.animated = true;

    if (this.editPaymentMethodModal) {
      this.selectedModal = 'EDIT_PAYMENT_METHOD';
      let verified: boolean = this._checkUserVerifiedPassword(config);

      if (verified) {
        config['class'] = 'edit__account__popup';

        this.showModal(this.editPaymentMethodModal, config);
      } else {
        this.openRetypePasswordModal(config);
      }
    }
  }

  close() {
    if (this.modalRef) {
      this.resetInitialState();
      this.modalRef.hide();
    }
  }

  private _checkUserVerifiedPassword(config): any {
    let passwordVerified: any = this.SS.get('password_verification');
    if (passwordVerified === null) {
      return false;
    }

    let verified: boolean = this._checkUserSessionValid(passwordVerified);

    return verified;
  }

  private _checkUserSessionValid(passwordVerified: any): boolean {
    let userId: number = this.LS.get('userId');
    let sessionUserId: number = Number(passwordVerified.user);
    if (sessionUserId !== Number(userId)) {
      this.SS.remove('password_verification');
      return false;
    }

    let expireAt: number = passwordVerified.expireAt;
    let currentTime: number = new Date().getTime();
    if (currentTime > expireAt) {
      this.SS.remove('password_verification');
      return false;
    }

    return true;
  }

  openSelectedModal(config: any) {
    switch (this.selectedModal) {
      case 'EDIT_ACCOUNT':
        this.openEditAccountModal(config);
        break;
      case 'EDIT_AVATAR':
        this.openEditAvatarModal(config);
        break;
      case 'EDIT_PASSWORD':
        this.openChangePasswordModal(config);
        break;
      case 'EDIT_TWO_FACTOR_AUTHENTICATION':
        this.openTwoFactorAuthenticationdModal(config);
        break;
      case 'EDIT_EMAIL':
        this.openEditEmailModal(config);
        break;
      case 'ADD_PAYMENT_METHOD':
        this.openAddPaymentMethodModal(config);
        break;
      case 'EDIT_PAYMENT_METHOD':
        this.openEditPaymentMethodModal(config);
        break;
      case 'CHARGE_DUE':
        this.openChargeDueModal(config);
        break;
      case 'PLAN_LIST':
        this.openPlanListModal(config);
        break;
      case 'CANCEL_SUBSCRIPTION':
        this.openConfirmationModal(config);
        break;
      default:
      //
    }
  }

  private resetInitialState() {
    let message: any = this.processModalAlertInformation('success', '');
    this.data$.next(message);
  }

  processModalAlertInformation(type: string, value: string, linkTitle: any = '', listId: any = 0) {
    let message: any = {
      type,
      value,
      linkTitle,
      listId
    };

    return message;
  }

}
