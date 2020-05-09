import React, { useState, useMemo, useEffect, useCallback } from 'react'
import Draggable from 'react-draggable'

import { db, setValueListener } from '../firebase'
import './Sticky.scss'

function Sticky({ id, onChanged }) {
	const [color, setColor] = useState('')
	const [pos, setPos] = useState(null)
	const [size, setSize] = useState(null)
	const [text, setText] = useState('Loading...')
	const [isDragging, setIsDragging] = useState(false)

	//const stickyRef = useMemo(() => db.ref(`stickies/${id}`), [])
	const stickyFirebasePath = `stickies/${id}`
	const colorRef = useMemo(() => db.ref(`${stickyFirebasePath}/color`), [stickyFirebasePath])
	const posRef = useMemo(() => db.ref(`${stickyFirebasePath}/pos`), [stickyFirebasePath])
	const sizeRef = useMemo(() => db.ref(`${stickyFirebasePath}/size`), [stickyFirebasePath])
	const textRef = useMemo(() => db.ref(`${stickyFirebasePath}/text`), [stickyFirebasePath])

	const getStickyData = useCallback(() => {
		return { color, pos, size, text }
	}, [color, pos, size, text])

	function handleStickyClicked() {

		console.log('hey Im clicked!')
	}

	useEffect(() => {
		setValueListener(colorRef, setColor)
		setValueListener(posRef, setPos)
		setValueListener(sizeRef, setSize)
		setValueListener(textRef, setText)

		// Detatch listeners from component
		return () => {
			colorRef.off()
			posRef.off()
			sizeRef.off()
			textRef.off()
		}
	}, [id])

	//console.log('isEditingText', isEditingText)
	// If the sticky hasn't loaded yet don't display it
	if (pos === null) return (null)

	return (
		<Draggable
			position={pos}
			grid={[10, 10]}
			onDrag={(e, position) => {
				if (!isDragging) setIsDragging(true)
				posRef.set({ x: position.x, y: position.y })
			}}
			onStop={() => {
				if (isDragging) {
					setIsDragging(false)
				} else {
					// handle sticky clicked
				}
			}}
			bounds='parent'
		>
			<div
				className='sticky'
				style={{
					backgroundColor: color
				}}
			>
				<input type='text' value={text} onChange={e => textRef.set(e.target.value)} />
			</div>
		</Draggable>
	)
}

export default Sticky