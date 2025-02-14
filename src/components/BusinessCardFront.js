// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { Stage, Layer, Text, Group, Image as KonvaImage } from 'react-konva'
import useImage from 'use-image'

import businessCardBackground from '../images/businesscardfront.jpg'
import facebookLogo from '../images/f-Logo_White.png'
import twitterLogo from '../images/x-twitter.png'
import instagramLogo from '../images/glyph-logo_May2016_white.png'

const BusinessCardFront = ({ data, width, height }) => {
	const [image] = useImage(businessCardBackground)
	const [facebook] = useImage(facebookLogo)
	const [twitter] = useImage(twitterLogo)
	const [instagram] = useImage(instagramLogo)
	const [ratio, setRatio] = useState(1)
	const paul = 'PaulGroteskSoft-Bold'
	const avenir = 'AvenirNextLTPro-Regular'
	const white = 'white'
	useEffect(() => {
		setRatio(width / (3.62 * 72))
	}, [width, height])
	return (
		<Stage width={width} height={height}>
			<Layer>
				<KonvaImage image={image} width={width} height={height} />
				<Text
					text={data.name}
					fontFamily={paul}
					fontSize={10 * ratio}
					fill={white}
					x={23 * ratio}
					y={23 * ratio}
					width={width - 23 * ratio}
				/>
				<Text
					text={data.title}
					fontFamily={avenir}
					fontSize={10 * ratio}
					fill={white}
					x={23 * ratio}
					y={38 * ratio}
					width={width - 92 * ratio} // was previously 23 but decreased width to help with wrapping
				/>
				<Text
					text={data.email}
					fontFamily={avenir}
					fontSize={10 * ratio}
					fill={white}
					x={23 * ratio}
					y={77 * ratio}
					width={width - 23 * ratio}
				/>
				<Text
					text={data.phone}
					fontFamily={avenir}
					fontSize={10 * ratio}
					fill={white}
					x={23 * ratio}
					y={92 * ratio}
					width={width - 23 * ratio}
				/>
				<Group
					x={23 * ratio}
					y={102 * ratio}
					width={width - 23 * ratio}
				>
					<Group x={width - 95 * ratio}>
						<KonvaImage
							image={facebook}
							width={13 * ratio}
							height={13 * ratio}
						/>
						<KonvaImage
							image={twitter}
							width={13 * ratio}
							height={13 * ratio}
							x={18 * ratio}
						/>
						<KonvaImage
							image={instagram}
							width={13 * ratio}
							height={13 * ratio}
							x={36 * ratio}
						/>
					</Group>
					<Text
						text={data.url ? `afsp.org/${data.url}` : 'afsp.org'}
						fontFamily={paul}
						fontSize={10 * ratio}
						fill={white}
						y={20 * ratio}
					/>
					<Text
						text={`@afspnational`}
						fontFamily={avenir}
						fontSize={10 * ratio}
						fill={white}
						x={width - 109 * ratio}
						y={20 * ratio}
						width={66 * ratio}
					/>
				</Group>
			</Layer>
		</Stage>
	)
}

export default BusinessCardFront
