import React from 'react';
import GroupEdit from 'modules/managerGroups/edit';
import Groups from 'modules/managerGroups/list';

export default () => (
	<div className="row row--no-gutter col-full-height">
		<div className="col-xs-12 col-sm-4 col-md-3 col--no-gutter scroll col-full-height">
			<Groups showAll={false} showRoot={false} showAdd={true} />
		</div>
		<div className="col-xs-12 col-sm-8 col-md-9 col--no-gutter scroll col-full-height">
			<GroupEdit />
		</div>
	</div>
);
