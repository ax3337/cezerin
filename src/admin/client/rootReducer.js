import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import productCategories from 'modules/productCategories/reducer';
import products from 'modules/products/reducer';
import customerGroups from 'modules/customerGroups/reducer';
import customers from 'modules/customers/reducer';
import managerGroups from 'modules/managerGroups/reducer';
import managers from 'modules/managers/reducer';
import orders from 'modules/orders/reducer';
import orderStatuses from 'modules/orderStatuses/reducer';
import pages from 'modules/pages/reducer';
import settings from 'modules/settings/reducer';
import apps from 'modules/apps/reducer';
import files from 'modules/files/reducer';

export default combineReducers({
	form: formReducer,
	productCategories,
	products,
	settings,
	customerGroups,
	customers,
	managers,
	managerGroups,
	orders,
	orderStatuses,
	pages,
	apps,
	files
});
