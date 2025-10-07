export interface SideBarMenuItemType {
    name: string;
    icon: JSX.Element;
    path?: string;
    isExpandable?: boolean;
    subItems?: Array<{ name: string; path: string; icon: JSX.Element }>;
  }

export interface MemberDetails {
  Member_id: string;
  Name: string;
  mobileno: string;
  email: string;
  state: string;
  city: string;
  address: string;
  pincode: string;
  Father_name: string;
  gender: string;
  dob: string;
  Date_of_joining: string;
  spackage: string;
  package_value: number;
  epin_no: string;
  amount: number;
  mode_of_payment: string;
  Pan_no: string;
  Nominee_name: string;
  Nominee_age: number;
  Nominee_Relation: string;
  status: string;
  node: string;
  transaction_pass: string;
  bdb_value: string;
  directreferal_value: string;
  bank_details: string;
  last_logged_in: string;
  google_pay: string;
  phonepe: string;
  member_code: string;
  roi_status: string;
  upgrade_package: string;
  upgrade_status: string;
  level_eligible: string;
  TBPDays: string;
  level_income: string;
  direct_income: string;
}