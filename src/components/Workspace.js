import React from 'react'

import Sticky from './Sticky'
import './Workspace.scss'

function Workspace() {
	const stickies = []
	function addSticky() {

	}

	return (
		<div className='workspace' onDoubleClick={() => { }}>
			{stickies && stickies.map(sticky => <Sticky data={sticky} />)}
			<Sticky data={{
				pos: {
					x: 100,
					y: 100
				},
				color: 'red',
				text: 'yeah'
			}}
			/>
		</div>
	)
}

export default Workspace