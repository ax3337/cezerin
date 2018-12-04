import React from 'react';
import ManagersList from 'modules/managers/list';
import Groups from 'modules/managerGroups/list';

export default () => (
	<div className="row row--no-gutter col-full-height">
		<div className="col-xs-12 col-sm-4 col-md-3 col--no-gutter scroll col-full-height">
			<Groups showAll={true} showRoot={false} showManage={true} />
		</div>
		<div className="col-xs-12 col-sm-8 col-md-9 col--no-gutter scroll col-full-height">
			<ManagersList />
		</div>
	</div>
);
