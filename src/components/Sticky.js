import React, { useState } from 'react'
import Draggable from 'react-draggable'
import './Sticky.scss'

function Sticky({ data, id }) {
	const [text, setText] = useState(data.text)
	const [pos, setPos] = useState(data.pos)
	const [isEditingText, setIsEditingText] = useState(false)

	return (
		<Draggable
			position={pos}
			grid={[10, 10]}
		>
			<div
				className='sticky'
				style={{
					backgroundColor: data.color
				}}
				onClick={() => setIsEditingText(true)}
				onDrag={() => { }}
			>
				{isEditingText ?
					<input type='text' value={text} onChange={e => setText(e.target.value)} /> :
					<span>{text}</span>
				}
			</div>
		</Draggable>
	)
}

export default Sticky