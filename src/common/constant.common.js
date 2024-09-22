"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIRTUAL_TRADING_ORDER_STATUS = exports.VIRTUAL_TRADING_ORDER_TRADE_TYPE = exports.VIRTUAL_TRADING_ORDER_TYPE = exports.VIRTUAL_TRADING_DELIVERY_TYPE = exports.INSTRUMENT_STATUS = exports.PAYMENT_LINK_STATUS = exports.PAYMENT_GATEWAY = exports.order_payment_status = exports.PAYMENT_TYPE = exports.NEWS_TYPE = exports.TRANSACTION_TYPE = exports.ORDER_TYPE = exports.BATCH_SHIFT = exports.BATCH_STATUS = exports.SESSION_STATUS = exports.REFERAL_STATUS = exports.ORDER_STATUS = exports.ZOOM_CURRENT_STATUS = exports.REDIS_KEYS = exports.ACTIVITY_TYPE = exports.ACC_REMOVE_STATUS = exports.PURCHASE_COURSE_TYPE = exports.ROLES = exports.WALLET_ADD = exports.REGISTER_REWARD = exports.COURSE_JOIN_REWARD = exports.MASTER_CLASS_JOIN_REWARD = exports.REFERAL_REWARD = void 0;
exports.REFERAL_REWARD = 50000;
exports.MASTER_CLASS_JOIN_REWARD = 500000;
exports.COURSE_JOIN_REWARD = 50000;
exports.REGISTER_REWARD = 200000;
exports.WALLET_ADD = {
    USER: "USER",
    USERSLIST: "USERSLIST",
    ALLUSER: "ALLUSER",
};
exports.ROLES = {
    ADMIN: "ADMIN",
    SUBADMIN: "SUBADMIN",
    USER: "USER",
    SPOC: "SPOC",
    TUTOR: "TUTOR",
    SALESADMIN: "SALESADMIN",
    SALESEMPLOYEE: "SALESEMPLOYEE"
};
exports.PURCHASE_COURSE_TYPE = {
    COURSE: "COURSE",
    MASTER_CLASS: "MASTER_CLASS"
};
exports.ACC_REMOVE_STATUS = {
    BY_ADMIN: "BY_ADMIN",
    BY_USER: "BY_USER",
    APPROVED: "APPROVED",
    FALSE: "FALSE"
};
exports.ACTIVITY_TYPE = {
    COURSE: "COURSE",
    MASTER_CLASS: "MASTER_CLASS"
};
exports.REDIS_KEYS = {
    ZOHO_ACCESS_TOKEN: "zoho_access_token",
    ZOHO_REFRESH_TOKEN: "zoho_refresh_token"
};
exports.ZOOM_CURRENT_STATUS = {
    ONGOING: "ONGOING",
    ENDED: "ENDED",
    SCHEDULED: "SCHEDULED"
};
exports.ORDER_STATUS = {
    ORDERED: "ORDERED",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
    REMOVED: "REMOVED"
};
exports.REFERAL_STATUS = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE"
};
exports.SESSION_STATUS = {
    UPCOMING: "UPCOMING",
    SCHEDULED: "SCHEDULED",
    ONGOING: "ONGOING",
    COMPLETED: "COMPLETED",
};
exports.BATCH_STATUS = {
    OPEN: "OPEN",
    CLOSED: "CLOSED",
};
exports.BATCH_SHIFT = {
    MORNING: "9AM-11AM",
    AFTERNOON: "1PM-3PM",
};
exports.ORDER_TYPE = {
    COURSE: "COURSE",
    MASTER_CLASS: "MASTER_CLASS",
    VIRTUAL_TRADING: "VIRTUAL_TRADING"
};
exports.TRANSACTION_TYPE = {
    DEBIT: "DEBIT",
    CREDIT: "CREDIT",
};
exports.NEWS_TYPE = {
    LATEST: "LATEST",
    TOPSTORY: "TOPSTORY",
    ORDINARY: "ORDINARY",
    TRENDING: "TRENDING"
};
exports.PAYMENT_TYPE = {
    normal: "normal",
    manual: "manual",
    byadmin: "byadmin",
    security_amount: "security_amount",
};
exports.order_payment_status = {
    initiated: "initiated",
    complete: "complete",
    declined: "declined",
    cancelled: "cancelled",
};
exports.PAYMENT_GATEWAY = {
    CC_AVENUE: 'CC_AVENUE'
};
exports.PAYMENT_LINK_STATUS = {
    Pending: 'Pending',
    Paid: 'Paid',
    Expired: 'Expired'
};
exports.INSTRUMENT_STATUS = {
    IN: 'IN',
    OUT: 'OUT'
};
exports.VIRTUAL_TRADING_DELIVERY_TYPE = {
    DELIVERY: "DELIVERY",
    INTERADAY: "INTRADAY"
};
exports.VIRTUAL_TRADING_ORDER_TYPE = {
    BUY: "BUY",
    SELL: "SELL"
};
exports.VIRTUAL_TRADING_ORDER_TRADE_TYPE = {
    MARKET: "Market",
    LIMIT: "Limit",
    STOPLOSSMARKET: "Stoplossmarket",
    STOPLOSSLIMIT: "Stoplossmarketlimit",
    GTT: "gtt"
};
exports.VIRTUAL_TRADING_ORDER_STATUS = {
    PENDING: "PENDING",
    INITIATED: "INITIATED",
    COMPLETED: "COMPLETED",
    DECLINED: "DECLINED",
};
