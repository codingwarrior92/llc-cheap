export interface IOrders {
  status_id: BigInteger,
  total_price: number,
  affiliate_id: number,
  service_level_id: number,
  product_id: string,
  package_id: number,
  order_contact: IContact,
  first_name: string,
  last_name: string,
  contact_type: string,
  addresses: IAddresses,
  address_type: string,
  addressable_type: string,
  country: string,
  address: string,
  address2: string,
  city: string,
  state: string,
  zip: string,
  emails: IEmails,
  email: string,
  email_type: string,
  phones: IPhones,
  number: string,
  phonable_type: string,
  phone_type: string,
  company: ICompany,
  name: string,
  client_id: string,
  registered_state_id: number,
  foreign_id: string,
  company_size: string,
  fiscal_year: string,
  purpose: string,
  contacts: IContacts,
  par: string,
  shares: number,
  managed_by: string,
  forwarding_address: IAddress,
  forwarding_contact: IContact
}

export interface IContact {
  first_name: string,
  last_name: string,
  contact_type: string,
  addresses: IAddresses,
  emails: IEmails,
  phones: IPhones
}

export interface ICompany {
  name: string,
  company_type: string,
  client_id: number,
  agent_id: number,
  parent_id: number,
  formation_on: string,
  registered_state_id: number,
  domestic_state_id: number,
  fiscal_year: string,
  address: IAddress
}

export interface IAddress {
  address: string,
  address2: string,
  city: string,
  state: string,
  zip: number
}

export interface IAddresses {
  phones: IAddress[];
}

export interface IEmail {
  id: number,
  email_type: string,
  emailable_id: number,
  emailable_type: string,
  email: string,
  created_at: string,
  updated_at: string
}

export interface IEmails {
  phones: IEmail[];
}


export interface IPhone {
  id: number,
  phone_type: string,
  phoneable_id: number,
  phoneable_type: string,
  number: number,
  extention: string,
  created_at: string,
  updated_at: string
}

export interface IPhones {
  phones: IPhone[];
}

export interface IContacts {
  id: number,
  contact_type: string,
  contactable_type: string,
  contactable_id: number,
  first_name: string,
  last_name: string,
  percentage: null,
  units: null,
  ssn: null,
  created_at: string,
  updated_at: string,
  title: string,
  capital_contribution: null,
  share_amount: null,
  consideration_amount: null,
  addresses: IAddresses,
  emails: IEmails,
  phones: IPhones
}

export interface IAgent {
  id: number,
  type: string,
  client_id: number,
  name: string,
  vendor_id: null,
  state_id: number,
  created_at: string,
  updated_at: string,
  addresses: IAddresses
}

export interface IDocument {
  id: number,
  documentable_id: number,
  user_id: number,
  document_type: number,
  status: string,
  file_name: string,
  is_read: number,
  uploaded_file_name: string,
  file_url: string,
  source: string,
  metadata: string,
  created_at: string,
  updated_at: string,
  documentable_type: string,
  should_print: number,
  shipping_label: null,
  download_url: string,
  order_id: number
}

export interface INote {
  id: number,
  note: string,
  added_by: number,
  notable_id: number,
  notable_type: string,
  is_acknowledged: 0,
  note_type: string,
  public_note: number,
  created_at: string,
  updated_at: string,
  deleted_at: null,
  parent_id: number
}

export interface INotes {
  notes: INote[]
}

export interface IOrderItem {
  id: number,
  order_id: number,
  order_item_type: string,
  company_id: number,
  product_id: number,
  description: string,
  price: number,
  retail_price: number,
  revenue_rate: number,
  rate_id: number,
  service_level_id: number,
  fee_id: null,
  state_id: number,
  county_id: number,
  is_check_amount: number,
  is_complete: null,
  deleted_at: null,
  created_at: string,
  updated_at: string,
  invoice_number: null
}

export interface IOrderItems {
  orders: IOrderItem[]
}

export interface IPayment {
  id: number,
  order_id: number,
  type: string,
  payment_method_id: number,
  payment_number: number,
  charge_id: string,
  amount_paid: number,
  payment_amount: number,
  approval_code: string,
  merchant_id: number,
  created_at: string,
  updated_at: string,
  void_check: number,
  payment_type: string,
  payable_to: null,
  stripe_payment_type: null
}

export interface IPayments {
  payment: IPayment[]
}

export interface IRate {
  id: number,
  name: string,
  description: string,
  client_id: number,
  price: number,
  default_price: number,
  revenue_rate: number,
  type: string,
  addon_type: null,
  count: number,
  included: number,
  product_id: number,
  service_level_id: number,
  package_id: number,
  deleted_at: null,
  created_at: string,
  updated_at: string
}

export interface IRates {
  rate: IRate[]
}

export interface IState {
  id: number,
  name: string,
  code: string,
  url: string,
  name_search_link: string,
  filing_method: string,
  payment_method: string,
  standard_processing_time: number,
  express_processing_time: number,
  user_name: string,
  password: number,
  forms_link: string,
  filing_notes: string,
  created_at: string,
  updated_at: string,
  check_payable_to: string,
  phones: IPhones,
  addresses: IAddresses
}

export interface IStatus {
  id: number,
  status: string,
  type: string,
  status_order: number,
  created_at: string,
  updated_at: string,
  action: string,
  customer_status: string,
  description: string
}

export interface IStatuses {
  status: IStatus[]
}

export interface ISubscription {
  id: number,
  subscriptionable_type: string,
  subscriptionable_id: number,
  product_id: number,
  term: number,
  order_item_id: number,
  subscription_start_date: string,
  subscription_end_date: string,
  company_status: string,
  stage_status: string,
  created_at: string,
  updated_at: string
}

export interface ISubscriptions {
  subscription: ISubscription[]
}

export interface IFee {
  id: number,
  product_id: number,
  type: string,
  company_type: string,
  feeable_id: 4,
  feeable_type: string,
  service_level_id: 1,
  description: string,
  price: number,
  deleted_at: null,
  created_at: string,
  updated_at: string,
  processing_time: number,
  product: IProduct,
  feeable: IFeeable
}

export interface IFees {
  fee: IFee[]
}

export interface IProduct {
  id: number,
  name: string,
  description: string,
  type: string,
  processing_required: number,
  is_state_specific: null,
  validation_rules: string,
  besp_price: number,
  term: number,
  autorenew_starting_event: number,
  created_at: string,
  updated_at: string,
  deleted_at: null
}

export interface IFeeable {
  id: 4,
  name: string,
  code: string,
  url: string,
  name_search_link: string,
  filing_method: string,
  payment_method: string,
  standard_processing_time: number,
  express_processing_time: number,
  user_name: string,
  password: number,
  forms_link: string,
  filing_notes: string,
  created_at: string,
  updated_at: string,
  check_payable_to: null,
  country: string
}

export interface IPricing {
  use_wholesale_rate: boolean,
  client_id: string,
  package_id: number,
  state_id: number,
  company_type: string,
  authorized_shares?: number,
  issued_shares?: number,
  par_value?: number,
  gross_assets?: number,
  product_ids: number[]
}