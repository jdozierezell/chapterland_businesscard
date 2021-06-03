import React, { useState } from 'react'
import { css } from '@emotion/react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import Toggle from 'react-toggle'

import affiliations from '../utils/affiliations'

import 'react-toggle/style.css'

const formCSS = css`
	label,
	input {
		display: block;
		width: 100%;
		font-family: 'AvenirNextLTPro-Regular';
		font-size: 16px;
	}
	label,
	.react-toggle {
		margin: 24px 0 6px;
	}
	label[for='showAddress'] {
		display: inline;
		padding-left: 24px;
		vertical-align: 12px;
	}
	label:first-of-type {
		margin-top: 0;
	}
	input {
		border-radius: 5px;
		border: 1px solid #262626;
		min-height: 34.3px;
	}
	> input {
		line-height: 1rem;
	}
	#urlWrapper {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		input {
			text-align: left;
		}
		span {
			vertical-align: center;
			padding-right: 0.5rem;
			font-family: 'AvenirNextLTPro-Demi';
		}
	}
	> .react-select__control {
		border: 1px solid #262626;
		border-radius: 5px;
		width: 100.5%;
	}
	> .react-select__control > .react-select__control {
		border: none;
	}
	.react-select__placeholder,
	.react-select__menu,
	.react-select__single-value {
		font-family: 'AvenirNextLTPro-Regular';
		font-size: 16px;
	}
	input[type='submit'] {
		margin-top: 48px;
		cursor: pointer;
	}
	#showSocialLabel {
		display: inline-block;
		width: initial;
		margin: 24px 0 0 24px;
		vertical-align: top;
		line-height: 24px;
	}
`

const BusinessCardForm = ({
	data,
	createPDF,
	onInputChange,
	onSelectChange,
}) => {
	const { handleSubmit, control, register } = useForm()
	const [showAddress, setShowAddress] = useState(false)

	const submitForm = () => {
		createPDF()
	}

	return (
		<form css={formCSS}>
			<label htmlFor="name">Name</label>
			<input
				{...register('name')}
				type="text"
				name="name"
				id="name"
				onChange={onInputChange}
			/>
			<label htmlFor="title">Title</label>
			<input
				{...register('title')}
				type="text"
				name="title"
				id="title"
				onChange={onInputChange}
			/>
			<label htmlFor="email">Email</label>
			<input
				{...register('email')}
				type="email"
				name="email"
				id="email"
				onChange={onInputChange}
			/>
			<label htmlFor="phone">Phone Number</label>
			<input
				{...register('phone')}
				type="text"
				name="phone"
				id="phone"
				onChange={onInputChange}
			/>
			<label id="affiliation" htmlFor="affiliation">
				Choose Your Affiliation
			</label>
			{/* <Controller
				as={Select}
				className="react-select__control"
				classNamePrefix="react-select"
				name="affiliation"
				control={control}
				options={affiliations}
				value={data.affiliation ? data.affiliation : ''}
				onChange={data => {
					onSelectChange(data)
				}}
			/> */}
			<Controller
				name="affiliation"
				control={control}
				render={({ field }) => (
					<Select
						{...field}
						classNamePrefix="react-select"
						options={affiliations}
					/>
				)}
			/>
			{(data.affiliation === 'Chapter' ||
				data.affiliation === 'Out of the Darkness Campus Walk' ||
				data.affiliation === 'Out of the Darkness Community Walk') && (
				<div></div>
			)}
		</form>
	)
}

export default BusinessCardForm
