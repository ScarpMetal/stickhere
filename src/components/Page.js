import React, { useEffect, useMemo, useState } from 'react'

import Sticky from './Sticky'
import { db, setValueListener } from '../firebase'
import { NAVBAR_HEIGHT, PAGE_BUFFER } from '../global/constants'
import './Page.scss'

function Page({ pageId }) {
	const [page, setPage] = useState({})
	const [maxWidth, setMaxWidth] = useState(0)
	const [maxHeight, setMaxHeight] = useState(0)

	const pageRef = useMemo(() => db.ref(`pages/${pageId}`), [pageId])

	const stickies = useMemo(() => {
		if (!page.stickies) return []

		const stickyArr = []
		for (let stickyId in page.stickies) {
			stickyArr.push(stickyId)
		}
		return stickyArr
	}, [page])

	// Listen for new stickies added to the page
	useEffect(() => {
		setValueListener(pageRef, setPage)

		return () => {
			pageRef.off()
		}
	}, [pageId])

	// Change width when document body loads
	useEffect(() => {
		if (maxWidth < document.body.clientWidth) {
			setMaxWidth(document.body.clientWidth)
		}
	}, [document.body.clientWidth])

	// Change height when document body loads 
	useEffect(() => {
		if (maxHeight < document.body.clientHeight) {
			setMaxHeight(document.body.clientHeight - NAVBAR_HEIGHT)
		}
	}, [document.body.clientHeight])

	function handleStickyChanged({ pos, size }) {
		console.log('pos, size', pos, size)
		if (!pos || !size) return

		console.log('pos, size', pos, size)
		if (pos.x + size.width + PAGE_BUFFER > maxWidth) {
			setMaxWidth(pos.x + size.width + PAGE_BUFFER)
		}
		if (pos.y + size.height + PAGE_BUFFER > maxHeight) {
			setMaxHeight(pos.y + size.height + PAGE_BUFFER)
		}
	}
	//console.log('stickies', stickies)
	//console.log('width/height', `${maxWidth}/${maxHeight}`)

	return (
		<div className='page-container'>
			<div
				className='page'
				onDoubleClick={() => { }}
				style={{
					width: maxWidth,
					height: maxHeight
				}}
			>
				{stickies && stickies.length && stickies.map(stickyId =>
					<Sticky
						key={stickyId}
						id={stickyId}
						onChanged={handleStickyChanged}
					/>
				)}
			</div>
		</div>
	)
}

export default Page