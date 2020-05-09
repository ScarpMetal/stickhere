import React, { useState, useEffect, useMemo } from 'react'
import Navbar from './components/Navbar'
import Page from './components/Page'
import { db, setValueListener } from './firebase'
import './App.scss'

function App() {
	const userId = 'test-user-id-1'
	const [user, setUser] = useState({})
	const [pageId, setPageId] = useState(null)

	const userRef = useMemo(() => db.ref(`users/${userId}`), [userId])

	useEffect(() => {
		setValueListener(userRef, user => {
			setPageId(Object.keys(user.pages)[0])
			setUser(user)
		})

		return () => {
			userRef.off()
		}
	}, [userId])

	return (
		<>
			<Navbar pages={user.pages} onSelectPage={pageId => setPageId(pageId)} />
			<Page pageId={pageId} />
		</>
	)
}

export default App
