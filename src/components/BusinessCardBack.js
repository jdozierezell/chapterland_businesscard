import React, { useState, useEffect } from 'react'
import {
	Stage,
	Layer,
	Rect,
	Line,
	Text,
	Group,
	Image as KonvaImage,
} from 'react-konva'
import useImage from 'use-image'

const BusinessCardFront = ({ data, width, height }) => {
	const defaultImage = `https://aws-fetch.s3.us-east-1.amazonaws.com/logos/businesscards/AFSP_Logo_CMYK.png`
	let imageFileName = defaultImage
	let address1, address2, city, state, zipCode
	if (data.affiliation) {
		console.log(data.affiliation.value)
		switch (data.affiliation.value) {
			case 'Chapter':
				if (data.chapter.value) {
					if (data.chapter.value !== 'No Chapter') {
						address1 = data.address1
						address2 = data.address2
						city = data.city
						state = data.state
						zipCode = data.zipCode
						imageFileName = `https://aws-fetch.s3.amazonaws.com/logos/businesscards/AFSP_ChapterLogoLockup_${data.logo}_CMYK.png`
					}
				}
				break
			case 'Out of the Darkness Campus Walk':
				address1 = null
				address2 = null
				city = null
				state = null
				zipCode = null
				imageFileName = `https://aws-fetch.s3.amazonaws.com/logos/businesscards/AFSP_LogoLockup_Campus_Walks_${data.logo}_CMYK.png`
				break
			case 'Out of the Darkness Community Walk':
				address1 = null
				address2 = null
				city = null
				state = null
				zipCode = null
				imageFileName = `https://aws-fetch.s3.amazonaws.com/logos/businesscards/AFSP_LogoLockup_Community_Walks_${data.logo}_CMYK.png`
				break
			case 'NYC':
				address1 = '199 Water St.'
				address2 = '11th Floor'
				city = 'New York'
				state = 'NY'
				zipCode = 10038
				imageFileName = defaultImage
				break
			case 'DC':
				address1 = '440 First Street, NW'
				address2 = 'Suite 300'
				city = 'Washington'
				state = 'D.C.'
				zipCode = 20001
				imageFileName = defaultImage
				break
			default:
				address1 = null
				address2 = null
				city = null
				state = null
				zipCode = null
				imageFileName = defaultImage
		}
		if (!data.chapter) {
			if (data.affiliation === 'Out of the Darkness Campus Walk') {
				imageFileName =
					'https://aws-fetch.s3.us-east-1.amazonaws.com/logos/businesscards/AFSP_LogoLockup_Campus_Walks_CMYK.png'
			} else if (
				data.affiliation === 'Out of the Darkness Community Walk'
			) {
				imageFileName =
					'https://aws-fetch.s3.us-east-1.amazonaws.com/logos/businesscards/AFSP_LogoLockup_Community_Walks_CMYK.png'
			}
		}
	}

	const [image] = useImage(imageFileName, 'Anonymous')
	const [imageWidth, setImageWidth] = useState(0)
	const [imageHeight, setImageHeight] = useState(0)
	const [addressLines, setAddressLines] = useState(0)
	const [ratio, setRatio] = useState(1)
	const [imageRatio, setImageRatio] = useState(1)
	const [addressWidth, setAddressWidth] = useState(0)

	const avenir = 'AvenirNextLTPro-Regular'
	const white = 'white'
	const gray = '#262626'

	useEffect(() => {
		let measureAddress1
		let measureAddress2
		let measureCityStateZip
		let lines = 0

		setRatio(width / (3.62 * 72))
		setImageRatio(width / (3.62 * 300))

		if (!document.getElementById('measureAddress1')) {
			measureAddress1 = document.createElement('span')
			measureAddress1.id = 'measureAddress1'
			measureAddress1.className = 'cardBackText'
		} else {
			measureAddress1 = document.getElementById('measureAddress1')
		}
		if (!document.getElementById('measureAddress2')) {
			measureAddress2 = document.createElement('span')
			measureAddress2.id = 'measureAddress2'
			measureAddress2.className = 'cardBackText'
		} else {
			measureAddress2 = document.getElementById('measureAddress2')
		}
		if (!document.getElementById('measureCityStateZip')) {
			measureCityStateZip = document.createElement('span')
			measureCityStateZip.id = 'measureCityStateZip'
			measureCityStateZip.className = 'cardBackText'
		} else {
			measureCityStateZip = document.getElementById('measureCityStateZip')
		}
		measureAddress1.innerHTML = address1 ? address1 : ''
		measureAddress2.innerHTML = address2 ? address2 : ''
		measureCityStateZip.innerHTML = `${city ? `${city},` : ''} ${
			state ? state : ''
		} ${zipCode ? zipCode : ''}`
		document.body.append(measureAddress1)
		document.body.append(measureAddress2)
		document.body.append(measureCityStateZip)
		setAddressWidth(
			Math.max.apply(null, [
				measureAddress1.offsetWidth,
				measureAddress2.offsetWidth,
				measureCityStateZip.offsetWidth,
			])
		)
		if (image) {
			setImageWidth((image.width * 1) / 3)
			setImageHeight((image.height * 1) / 3)
		}
		if (address1) {
			lines = lines + 1
		}
		if (address2) {
			lines = lines + 1
		}
		if (city) {
			lines = lines + 1
		}
		setAddressLines(lines * ratio)
	}, [
		width,
		height,
		image,
		imageHeight,
		imageWidth,
		data,
		addressLines,
		ratio,
		address1,
		address2,
		city,
		addressWidth,
		state,
		zipCode,
	])
	return (
		<Stage width={width} height={height}>
			<Layer>
				<Rect x={0} y={0} width={width} height={height} fill={white} />
				<Group
					x={
						(width -
							(imageWidth * imageRatio +
								6 * ratio * 2 +
								addressWidth * ratio)) /
						2
					}
					y={height / 2 - (imageHeight * imageRatio) / 2}
				>
					<KonvaImage
						image={image}
						width={imageWidth * imageRatio}
						height={imageHeight * imageRatio}
						x={0}
					/>
					{addressWidth > 0 && (
						<Line
							x={imageWidth * imageRatio + 6 * ratio}
							points={[0, 0, 0, imageHeight * imageRatio]}
							stroke="#262626"
							strokeWidth={1}
						/>
					)}
					<Group
						fill={gray}
						// x={(width / 2) + (8 * ratio)}
						x={imageWidth * imageRatio + 6 * ratio * 2}
						y={
							(imageHeight * imageRatio) / 2 -
							(addressLines * 12) / 2
						}
						width={width / 2 - 23}
						clip={{
							x: 0,
							y: 0,
							width: width / 2 - 23,
							height: addressLines * 12 * ratio,
						}}
					>
						<Text
							fontFamily={avenir}
							text={address1}
							fontSize={10 * ratio}
							letterSpacing={-1}
							y={0 * 14}
						/>
						<Text
							fontFamily={avenir}
							text={address2}
							fontSize={10 * ratio}
							letterSpacing={-1}
							y={1 * 14 * ratio}
						/>
						<Text
							fontFamily={avenir}
							text={`${city ? `${city},` : ''} ${
								state ? state : ''
							} ${zipCode ? zipCode : ''}`}
							fontSize={10 * ratio}
							letterSpacing={-1}
							y={address2 ? 2 * 14 * ratio : 1 * 14 * ratio}
						/>
					</Group>
				</Group>
			</Layer>
		</Stage>
	)
}

export default BusinessCardFront
