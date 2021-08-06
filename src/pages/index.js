import React, { useState, useRef, useEffect } from 'react'
import { css } from '@emotion/react'
import useImage from 'use-image'

import DocRaptor from '../utils/docraptor'

import BusinessCardForm from '../components/BusinessCardForm'
import BusinessCardFront from '../components/BusinessCardFront'
import BusinessCardBack from '../components/BusinessCardBack'

import affiliations from '../utils/affiliations'
import chapters from '../utils/chapters'
import states from '../utils/states'

const appCSS = css`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 64px;
	padding: 24px;
	@media screen and (min-width: 768px) {
		grid-template-columns: minmax(300px, 1fr) minmax(263px, 525px);
	}
`

const instructionsCSS = css`
	font-family: 'AvenirNextLTPro-Regular';
	grid-column: 1 / 2;
	grid-row: 1 / 2;
	@media screen and (min-width: 768px) {
		grid-column: 1 / 3;
	}
`

const formCSS = css`
	grid-column: 1 / 2;
	grid-row: 2 / 3;
	max-width: 100%;
`

const cardCSS = css`
	grid-column: 1 / 2;
	grid-row: 3 / 4;
	max-width: 100%;
	@media screen and (min-width: 768px) {
		grid-column: 2 / 3;
		grid-row: 2 / 3;
	}
	> div {
		width: 100%;
	}
	> div:first-of-type {
		padding-bottom: 24px;
	}
	> div:last-of-type {
		border: 1px solid #262626;
	}
`

export default function Home() {
	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)
	const [data, setData] = useState({})
	const [remaining, setRemaining] = useState({
		name: { length: 0, limit: 29 },
		title: { length: 0, limit: 61 },
		email: { length: 0, limit: 29 },
		phone: { length: 0, limit: 21 },
		address1: { length: 0, limit: 16 },
		address2: { length: 0, limit: 16 },
		city: { length: 0, limit: 13 },
		zipCode: { length: 0, limit: 6 },
		URL: { length: 0, limit: 21 },
	})
	const [showAddress, setShowAddress] = useState(false)
	const [walkURL, setWalkURL] = useState(false)
	const [print, setPrint] = useState(false)
	const [cardFront, setCardFront] = useState(null)
	const [cardFrontImage] = useImage(cardFront)
	const [cardBack, setCardBack] = useState(null)
	const [cardBackImage] = useImage(cardBack)
	const cardRef = useRef(null)

	const setStateDimensions = () => {
		const container = cardRef.current
		const containerWidth = container.offsetWidth
		if (containerWidth < 400) {
			setWidth(window.innerWidth - 48)
			setHeight((window.innerWidth - 48) * (2.12 / 3.62))
		} else if (containerWidth < 1083) {
			setWidth(containerWidth)
			setHeight((containerWidth * 2.12) / 3.62)
		} else {
			setWidth(1083)
			setHeight(633)
		}
	}

	const createPDF = () => {
		setPrint(true)
	}

	const onInputChange = (e) => {
		setRemaining((prevState) => ({
			...prevState,
			[e.target.name]: {
				...prevState[e.target.name],
				length: e.target.value.length,
			},
		}))
		if (e.target.value.length === e.target.maxLength) {
			e.target.style.border = '1px solid #eb1426'
			document.getElementById(`${e.target.name}Limit`).style.color =
				'#eb1426'
		} else {
			e.target.style.border = '1px solid #262626'
			document.getElementById(`${e.target.name}Limit`).style.color =
				'#525252'
		}
		switch (e.target.name) {
			case 'name':
				setData({ ...data, name: e.target.value })
				break
			case 'title':
				setData({ ...data, title: e.target.value })
				break
			case 'email':
				setData({ ...data, email: e.target.value })
				break
			case 'phone':
				setData({ ...data, phone: e.target.value })
				break
			case 'address1':
				setData({ ...data, address1: e.target.value })
				break
			case 'address2':
				setData({ ...data, address2: e.target.value })
				break
			case 'city':
				setData({ ...data, city: e.target.value })
				break
			case 'zipCode':
				setData({ ...data, zipCode: e.target.value })
				break
			case 'URL':
				setData({
					...data,
					url: e.target.value,
				})
				break
			default:
				return
		}
	}
	const onSelectChange = (e) => {
		const value = e.value
		const label = e.label
		switch (e.name) {
			case 'socialChannel':
				setData({
					...data,
					socialChannel: { value, label },
				})
				break
			case 'affiliation':
				let url = data.url
				if (value === 'NYC' || value === 'DC' || value === 'Chapter') {
					setWalkURL(false)
					if (value === 'Chapter' && data.chapter) {
						chapters.forEach((chapter) => {
							if (chapter.value === data.chapter.value) {
								url = chapter.url
							}
						})
					} else {
						url = ''
					}
				}
				setData({
					...data,
					affiliation: { value, label },
					url,
				})
				break
			case 'chapter':
				setData({
					...data,
					chapter: { value, label },
					logo: e.logo,
					url: !walkURL ? e.url : data.url,
				})
				break
			case 'state':
				setData({
					...data,
					state: { value, label },
				})
				break
			default:
				return
		}
	}

	const onToggleChange = (e) => {
		switch (e.target.name) {
			case 'showAddress':
				setShowAddress(e.target.checked)
				break
			case 'walkURL':
				setWalkURL(e.target.checked)
				break
			default:
				return
		}
	}

	useEffect(() => {
		const date = Date.now()
		if (print) {
			const cards = document.getElementsByTagName('canvas')
			setCardFront(cards[0].toDataURL())
			setCardBack(cards[1].toDataURL())
		}
		if (cardFrontImage && cardBackImage) {
			DocRaptor.createAndDownloadDoc('nnuiFL08ehM6NeY2NhU', {
				test: false, // test documents are free, but watermarked
				type: 'pdf',
				name: `AFSP-Business-Card-${date}.pdf`,
				pipeline: '9',
				document_content: `<html><head><style type="text/css">@page { margin: 0; size: 3.62in 2.12in; } img { width: 3.62in; height: 2.12in; }</style></head><body><img src="${cardFrontImage.src}" /><img src="${cardBackImage.src}" /></body></html>`,
			})
			setPrint(false)
			setCardFront(null)
			setCardBack(null)
		}
		// set image coordinates to center based on width and height
		window.addEventListener('resize', setStateDimensions)
		setStateDimensions()
		return () => window.removeEventListener('resize', setStateDimensions)
	}, [cardBackImage, cardFrontImage, print])

	return (
		<div css={appCSS} className="App">
			<p css={instructionsCSS}>
				Complete the fields below to create your printable business
				card. Please check the PDF you download for any errors or issues
				as this is the file that will be printed at home, online, or by
				your local printer. If you're not sure where to print, we
				recommend{' '}
				<a
					href="https://www.vistaprint.com/business-cards/rounded-corner?xnid=TopNav_Rounded+Corner+Business+Cards_Premium+Shapes_Business+Cards&xnav=TopNav"
					target="_blank"
					rel="noreferrer noopener"
				>
					Vistaprint
				</a>
				. Depending on your internet connection speed, creating your
				card may take up to 15-20 seconds.
			</p>
			<div css={formCSS}>
				<BusinessCardForm
					data={data}
					showAddress={showAddress}
					walkURL={walkURL}
					affiliations={affiliations}
					chapters={chapters}
					states={states}
					createPDF={createPDF}
					onInputChange={onInputChange}
					onSelectChange={onSelectChange}
					onToggleChange={onToggleChange}
					remaining={remaining}
				/>
			</div>
			<div css={cardCSS} ref={cardRef}>
				<BusinessCardFront data={data} width={width} height={height} />
				<BusinessCardBack
					data={data}
					showAddress={showAddress}
					width={width}
					height={height}
				/>
			</div>
		</div>
	)
}
