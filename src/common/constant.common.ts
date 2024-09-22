export const REFERAL_REWARD = 50000 as const;
export const MASTER_CLASS_JOIN_REWARD = 500000 as const;
export const COURSE_JOIN_REWARD = 50000 as const;
export const REGISTER_REWARD = 200000 as const;


export const WALLET_ADD = {
  USER: "USER",
  USERSLIST: "USERSLIST",
  ALLUSER: "ALLUSER",
} as const;

export type WALLET_ADD_TYPE = keyof typeof WALLET_ADD;

export const ROLES = {
  ADMIN: "ADMIN",
  SUBADMIN: "SUBADMIN",
  USER: "USER",
  SPOC: "SPOC",
  TUTOR: "TUTOR",
  SALESADMIN: "SALESADMIN",
  SALESEMPLOYEE: "SALESEMPLOYEE"
} as const;

export type ROLES_TYPE = keyof typeof ROLES;

export const PURCHASE_COURSE_TYPE = {
  COURSE: "COURSE",
  MASTER_CLASS: "MASTER_CLASS"
} as const
export type PURCHASE_COURSE_TYPE = keyof typeof PURCHASE_COURSE_TYPE;

export const ACC_REMOVE_STATUS = {
  BY_ADMIN: "BY_ADMIN",
  BY_USER: "BY_USER",
  APPROVED: "APPROVED",
  FALSE: "FALSE"
} as const
export type ACC_REMOVE_STATUS = keyof typeof ACC_REMOVE_STATUS;

export const ACTIVITY_TYPE = {
  COURSE: "COURSE",
  MASTER_CLASS: "MASTER_CLASS"
}
export type ACTIVITY_TYPE = keyof typeof ACTIVITY_TYPE;

export const REDIS_KEYS = {
  ZOHO_ACCESS_TOKEN: "zoho_access_token",
  ZOHO_REFRESH_TOKEN: "zoho_refresh_token"
}
export type REDIS_KEYS = keyof typeof REDIS_KEYS;

export const ZOOM_CURRENT_STATUS = {
  ONGOING: "ONGOING",
  ENDED: "ENDED",
  SCHEDULED: "SCHEDULED"
} as const
export type ZOOM_CURRENT_STATUS = keyof typeof ZOOM_CURRENT_STATUS;

export const ORDER_STATUS = {
  ORDERED: "ORDERED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  REMOVED:"REMOVED"
} as const;
export type ORDER_STATUS = keyof typeof ORDER_STATUS;

export const REFERAL_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE"
} as const;
export type REFERAL_STATUS = keyof typeof REFERAL_STATUS;

export const SESSION_STATUS = {
  UPCOMING: "UPCOMING",
  SCHEDULED: "SCHEDULED",
  ONGOING: "ONGOING",
  COMPLETED: "COMPLETED",
} as const;
export type SESSION_STATUS = keyof typeof SESSION_STATUS;

export const BATCH_STATUS = {
  OPEN: "OPEN",
  CLOSED: "CLOSED",
} as const;
export type BATCH_STATUS = keyof typeof BATCH_STATUS;

export const BATCH_SHIFT = {
  MORNING: "9AM-11AM",
  AFTERNOON: "1PM-3PM",
} as const;
export type BATCH_SHIFT = keyof typeof BATCH_SHIFT;

export const ORDER_TYPE = {
  COURSE: "COURSE",
  MASTER_CLASS: "MASTER_CLASS",
  VIRTUAL_TRADING: "VIRTUAL_TRADING"
} as const;
export type ORDER_TYPE = keyof typeof ORDER_TYPE;

export const TRANSACTION_TYPE = {
  DEBIT: "DEBIT",
  CREDIT: "CREDIT",
} as const;
export type TRANSACTION_TYPE = keyof typeof TRANSACTION_TYPE;

export const NEWS_TYPE = {
  LATEST: "LATEST",
  TOPSTORY: "TOPSTORY",
  ORDINARY: "ORDINARY",
  TRENDING: "TRENDING"
} as const;
export type NEWS_TYPE = keyof typeof NEWS_TYPE;

export const PAYMENT_TYPE = {
  normal: "normal",
  manual: "manual",
  byadmin: "byadmin",
  security_amount: "security_amount",
} as const;

export type PAYMENT_TYPE = keyof typeof PAYMENT_TYPE;



export const order_payment_status = {
  initiated: "initiated",
  complete: "complete",
  declined: "declined",
  cancelled: "cancelled",
} as const

export type order_payment_status = keyof typeof order_payment_status;

export const PAYMENT_GATEWAY = {
  CC_AVENUE: 'CC_AVENUE'
} as const

export type PAYMENT_GATEWAY_TYPE = keyof typeof PAYMENT_GATEWAY;

export const PAYMENT_LINK_STATUS = {
  Pending: 'Pending',
  Paid: 'Paid',
  Expired: 'Expired'
} as const;

export type PAYMENT_LINK_STATUS_TYPE = keyof typeof PAYMENT_LINK_STATUS;

export const INSTRUMENT_STATUS = {
  IN: 'IN',
  OUT: 'OUT'
} as const

export type INSTRUMENT_STATUS_TYPE = keyof typeof INSTRUMENT_STATUS;


export const VIRTUAL_TRADING_DELIVERY_TYPE = {
  DELIVERY: "DELIVERY",
  INTERADAY: "INTRADAY"

} as const

export type VIRTUAL_TRADING_DELIVERY_TYPE = keyof typeof VIRTUAL_TRADING_DELIVERY_TYPE;


export const VIRTUAL_TRADING_ORDER_TYPE = {
  BUY: "BUY",
  SELL: "SELL"

} as const

export type VIRTUAL_TRADING_ORDER_TYPE = keyof typeof VIRTUAL_TRADING_ORDER_TYPE;

export const VIRTUAL_TRADING_ORDER_TRADE_TYPE = {
  MARKET: "Market",
  LIMIT: "Limit",
  STOPLOSSMARKET: "Stoplossmarket",
  STOPLOSSLIMIT: "Stoplossmarketlimit",
  GTT: "gtt"
}

export type VIRTUAL_TRADING_ORDER_TRADE_TYPE = keyof typeof VIRTUAL_TRADING_ORDER_TRADE_TYPE;


export const VIRTUAL_TRADING_ORDER_STATUS = {
  PENDING: "PENDING",
  INITIATED: "INITIATED",
  COMPLETED: "COMPLETED",
  DECLINED: "DECLINED",

} as const

export type VIRTUAL_TRADING_ORDER_STATUS = keyof typeof VIRTUAL_TRADING_ORDER_STATUS;