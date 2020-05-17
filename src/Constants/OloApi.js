//consts ....................

export const androidHeader = { "AndroidPhone": 'EV6FTlgBhOalM+qjJpr2OZpAEpPkYJHC5I1aOWyeLevwSIpuzyKEAg==' };
// export const imgBase = `https://foodmarshal.blob.core.windows.net/fmstorage/`;
export const imgBase = `https://foodmarshal.blob.core.windows.net/fmtesting/`;

export const BaseApi = "https://fmtest.dishco.com/shawmanservices/api/";

export const testApi = "https://fmtest.dishco.com/shawmanservices/api/";
// const IntLocAccountId = 0;
const IntLocCityId = 1190;
const IntLocLocationId = 1123;
const IntLocRestaurantId = 642477;
const IntLocAccountId = 3385;
//consts ....................
export const getLandingPageBanner =
  "LandingPageBanner/GetFunPubRestaurantDetailsByFilter";
export const getLandingPageBannerParams = {
  IntLocAccountId,
  IntLocCityId: null,
  IntLocRestaurantId: 0
};

export const getHomeDetails = "OLOWebHomeDetail/FunPubGetHomeInfo";
export const getHomeDetailsParams = {
  IntLocAccountId,
  IntLocCityId: null,
  IntLocLocationId: null,
  IntLocRestaurantId: null
};
export const getCustomerId =
  "OLOGetCustomerID/FunPubGetCustomerID?StrLocMobileNo=7276577929";
export const custId = 117420;
export const getAllCities = "AllCities/GetFuncPubAllCities";
export const getAllCitiesParams = { intLocCountryId: 1 };
export const GetAllLocations = "AllLocations/GetFunPubAllLocations";
export const GetAllLocationsParams = { StrLocCityName: 1 };
export const GetRestuarantList =
  "HDRestaurantPolygonList/FunPubGetRestuarantList";
export const GetRestuarantListParams = {
  IntLocCustomerId: 6557,
  StrLocChannelCode: "002",
  Strloclatitude: "19.109528",
  strLocLongitude: "73.01802",
  IntLocMaxRecordCount: 0
};

export const GetRestuarantListByCity =
  "OLOGetRestaurantListByLocation/FunPubGetRestaurantListByLocation";
export const GetRestuarantListByCityParams = {
  IntLocCityId: 1190,
  IntLocLocationId: 1092
};
//new meals
export const GetMenuDetailsSingleApi =
  "OLOGetMenuDetailsSingleApi/FunPubGetMenuDetails";
export const GetMenuDetailsSingleApiParams = { StrLocRestaurantId: 642488 };

export const GetHDMenuHeadList = "HDMenuHeadList/FunPubGetHDMenuHeadList";
export const GetHDMenuHeadListParams = {
  IntLocAccountId,
  IntLocRestaurantId: 650772,
  StrLocPickupTime: "20.1"
};

export const GetHDMenuItemModifier =
  "HDMenuItemModifier/FunPubGetHDMenuModifierList";
export const GetHDMenuItemModifierParams = {
  IntLocAccountId,
  IntLocRestaurantId: 650772,
  intLocMenuHeadId: 320,
  StrLocMenuItemId: "sak09"
};

export const GetHDMenuItemList = "HDMenuItemList/FunPubGetHDMenuItemList";
export const GetHDMenuItemListParams = {
  IntLocAccountId,
  IntLocRestaurantId: 650772,
  intLocMenuHeadId: 9,
  StrLocPickupTime: "02:00"
};
//for billing
export const HDCheckTotalAmount =
  "OLOWebCheckTotalAmount/FunPubGetHDMenuHeadList";
export const HDCheckTotalAmountParams = {
  IntLocRestaurantId: 650772,
  intLocAddressId: 0,
  IntLocCustomerId: 0,
  IntLocAccountId,
  strLocOrderDate: "04/23/2020",
  PropMenuItemDetails: [],
  PropCounterSaleOrderDetail: [
    {
      ProPubSessionId: "c57f63a0-86ee-11ea-c844-fb0db4c93d3e",
      ProPubStrPaymode: "C"
    }
  ]
};

export const GetAddressList =
  "HDSearchPolygon/FunPubGetAddressList?StrLocSearchText=bandra";
export const GetAddressListParams = { StrLocSearchText: "bandra" };
export const GetFormatedAddress =
  "GetFormatedAddress/FunPubRetrieveFormatedAddress";
export const GetFormatedAddressParams = {
  Strloclatitude: "18.4097",
  Strloclongitude: "73.5066"
};

export const CheckRestaurantsPayments =
  "CheckRestaurantsPayments/FunPubGetRestaurantPaymentTypes";
export const CheckRestaurantsPaymentsParams = {
  IntLocRestaurantId: 650772,
  IntLocFlag: 5
};

export const GetHDAddressList = "HdAddressList/FunPubGetHDAddressList";
export const GetHDAddressListParams = {
  IntLocSetDefault: 1,
  IntLocAddressId: 0,
  IntLocCustomerId: 6557
};

export const CheckRestaurantDeliveryStatus =
  "HdRestaurantPolygonDeliveryStatus/FunCheckRestaurantDeliveryStatus";
export const CheckRestaurantDeliveryStatusParams = {
  IntLocRestaurantId: 650772,
  IntLocPolygonId: 51
};

//____________Post_____________________________________________
export const getOTP =
  "OLOSendMobileOTP/FunPubOLOSendMobileOTP?StrLocMobileNo=9619466002";

export const updateAdd = `HDAddressInsertUpdate/FunPubInsertUpdateHDAddress`;
export const updateAddParams = {
  IntLocCustomerId: 117420,
  IntLocAddressId: 0,
  strLocAddress: "",
  IntLocIsDefault: 1,
  strLocCompanyName: "",
  IntLocCity: 3,
  IntLocDeliveryLocationId: 58,
  strLocAprt_LocalityName: "",
  strLocPostCode: "",
  strLocFlat_HouseNo: ` pabal dist pune`
};
export const abc = `https://fmtest.dishco.com/shawmanservices/api/HDInsertOrder/FunPubInsertOrderDetails?IntLocRestaurantId=642336&strLoCPaymentMode=COD%7CNA%7CNA%7CNA&IntLocCustomerId=117519&strLocCardNumber=&strLocOrderDate=05/12/2020&strLocDeliveryArea=Patel%20Wadi,%20Madh,%20Mumbai&TotalAmount=157.85&strLocTransactionStatus=Success&strLocMerchantId=&strLocComment=&intLocAddressId=247&strLocTocken=&strLocTransactionId=&PropMenuItemDetails=%5B%7B%22ProPubStrMenuItemCode%22:%22478%22,%22ProPubIntQty%22:2,%22ProPubIntMenuComboModifier%22:%220%22,%22ProPubStrCurrentIncomeHeadCode%22:%221%22,%22ProPubIntSelectedRowIndex%22:0,%22ProPubSessionId%22:%22caa9cce0-9458-11ea-b741-f551a90fe04b%22,%22ProPubStrPreModifierCode%22:%22%22%7D,%7B%22ProPubIntMenuComboModifier%22:%220%22,%22ProPubStrItemDescription%22:%22299%20modifier%22,%22ProPubBoolIsAllowChange%22:true,%22ProPubStrModifierQtyCode%22:%220%22,%22ProPubStrPreModifierCode%22:%22%22,%22ProPubIntQty%22:2,%22ProPubStrModifierCode%22:%22654%22,%22ProPubSessionId%22:%22caa9cce0-9458-11ea-b741-f551a90fe04b%22,%22ProPubIntSelectedRowIndex%22:0%7D,%7B%22ProPubStrMenuItemCode%22:%22478%22,%22ProPubIntQty%22:1,%22ProPubIntMenuComboModifier%22:%220%22,%22ProPubStrCurrentIncomeHeadCode%22:%221%22,%22ProPubIntSelectedRowIndex%22:1,%22ProPubSessionId%22:%22caa9cce0-9458-11ea-b741-f551a90fe04b%22,%22ProPubStrPreModifierCode%22:%22%22%7D,%7B%22ProPubIntMenuComboModifier%22:%220%22,%22ProPubStrItemDescription%22:%221%20PLATE%22,%22ProPubBoolIsAllowChange%22:true,%22ProPubStrModifierQtyCode%22:%220%22,%22ProPubStrPreModifierCode%22:%22%22,%22ProPubIntQty%22:1,%22ProPubStrModifierCode%22:%22629%22,%22ProPubSessionId%22:%22caa9cce0-9458-11ea-b741-f551a90fe04b%22,%22ProPubIntSelectedRowIndex%22:1%7D%5D&PropCounterSaleOrderDetail=%5B%7B%22ProPubSessionId%22:%22caa9cce0-9458-11ea-b741-f551a90fe04b%22,%22ProPubStrPaymode%22:%22C%22%7D%5D`;
