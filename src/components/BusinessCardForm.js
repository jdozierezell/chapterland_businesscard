import React from 'react'
import { css } from '@emotion/react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import Toggle from 'react-toggle'

import 'react-toggle/style.css'

const formCSS = css`
	label,
	input {
		display: block;
		width: 100%;
		font-family: 'AvenirNextLTPro-Regular';
		font-size: 16px;
	}
	input[type='submit'] {
		background-color: #396dff;
		color: white;
		border: none;
		outline: none;
		cursor: pointer;
		:hover {
			background-color: #3428bd;
		}
		:active {
			background-color: #3428bd;
		}
	}
	input:disabled {
		background-color: #87a7ff;
		color: white;
		border: none;
		outline: none;
		:hover {
			background-color: #87a7ff;
		}
		:active {
			background-color: #87a7ff;
		}
	}
	label,
	.react-toggle {
		margin: 24px 0 6px;
	}
	label[for='showAddress'],
	label[for='walkURL'] {
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
		&:invalid {
			border: 1px solid #eb1426;
		}
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
			padding: 0 0.5rem 0 0;
			font-size: 1em;
			color: #262626;
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
	.submit-wrapper {
		margin-top: 48px;
	}
	#showSocialLabel {
		display: inline-block;
		width: initial;
		margin: 24px 0 0 24px;
		vertical-align: top;
		line-height: 24px;
	}
	span {
		color: #525252;
		font-family: 'AvenirNextLTPro-Regular';
		font-size: 12px;
		padding-bottom: 16px;
		display: inline-block;
	}
`

const BusinessCardForm = ({
	data,
	showAddress,
	walkURL,
	affiliations,
	chapters,
	states,
	createPDF,
	onInputChange,
	onSelectChange,
	onToggleChange,
	remaining,
}) => {
	const { handleSubmit, control, register } = useForm()
	const formKeys = Object.keys(remaining)
	let disabled = 0

	const submitForm = () => {
		createPDF()
	}

	formKeys.forEach((key) => {
		if (remaining[key].length === remaining[key].limit) {
			disabled++
		}
	})

	disabled = disabled > 0 ? true : false

	return (
		<form css={formCSS} onSubmit={handleSubmit(submitForm)}>
			<label htmlFor="name">Name</label>
			<span id="nameLimit">
				<em>{`Field limited to ${
					remaining.name.limit - 1
				} characters. Characters remaining: ${
					remaining.name.limit - 1 - remaining.name.length
				}`}</em>
			</span>
			<input
				{...register('name')}
				type="text"
				name="name"
				id="name"
				onChange={onInputChange}
				maxLength={remaining.name.limit}
			/>
			<label htmlFor="title">Title</label>
			<span id="titleLimit">
				<em>{`Field limited to ${
					remaining.title.limit - 1
				} characters. Characters remaining: ${
					remaining.title.limit - 1 - remaining.title.length
				}`}</em>
			</span>
			<input
				{...register('title')}
				type="text"
				name="title"
				id="title"
				onChange={onInputChange}
				maxLength={remaining.title.limit}
			/>
			<label htmlFor="email">Email</label>
			<span id="emailLimit">
				<em>{`Field limited to ${
					remaining.email.limit - 1
				} characters. Characters remaining: ${
					remaining.email.limit - 1 - remaining.email.length
				}`}</em>
			</span>
			<input
				{...register('email')}
				type="email"
				name="email"
				id="email"
				onChange={onInputChange}
				maxLength={remaining.email.limit}
			/>
			<label htmlFor="phone">Phone Number</label>
			<span id="phoneLimit">
				<em>{`Field limited to ${
					remaining.phone.limit - 1
				} characters. Characters remaining: ${
					remaining.phone.limit - 1 - remaining.phone.length
				}`}</em>
			</span>
			<input
				{...register('phone')}
				type="text"
				name="phone"
				id="phone"
				onChange={onInputChange}
				maxLength={remaining.phone.limit}
			/>
			<label id="affiliation" htmlFor="affiliation">
				Affiliation
			</label>
			<Controller
				name="affiliation"
				control={control}
				render={({ field }) => (
					<Select
						{...field}
						classNamePrefix="react-select"
						options={affiliations}
						value={data.affiliation}
						onChange={(data) => {
							onSelectChange({ ...data, name: 'affiliation' })
						}}
					/>
				)}
			/>
			{data.affiliation &&
				(data.affiliation.value === 'Chapter' ||
					data.affiliation.value ===
						'Out of the Darkness Campus Walk' ||
					data.affiliation.value ===
						'Out of the Darkness Community Walk') && (
					<>
						<label id="chapter" htmlFor="chapter">
							Chapter
						</label>
						<Controller
							name="chapter"
							control={control}
							render={({ field }) => (
								<Select
									{...field}
									classNamePrefix="react-select"
									options={chapters}
									value={data.chapter}
									onChange={(data) => {
										onSelectChange({
											...data,
											name: 'chapter',
										})
									}}
								/>
							)}
						/>
						{data.affiliation.value === 'Chapter' &&
							data.chapter &&
							data.chapter.value !== 'No Chapter' && (
								<>
									<Toggle
										name="showAddress"
										onChange={onToggleChange}
										checked={showAddress}
									/>
									<label htmlFor="showAddress">
										Show address on business card?
									</label>
								</>
							)}
						{(data.affiliation.value ===
							'Out of the Darkness Campus Walk' ||
							data.affiliation.value ===
								'Out of the Darkness Community Walk') && (
							<>
								<Toggle
									name="walkURL"
									onChange={onToggleChange}
								/>
								<label htmlFor="walkURL">
									Customize walk URL?
								</label>
							</>
						)}
						{showAddress && data.affiliation.value === 'Chapter' && (
							<>
								<label htmlFor="address1">Address 1</label>
								<span id="address1Limit">
									<em>{`Field limited to ${
										remaining.address1.limit - 1
									} characters. Characters remaining: ${
										remaining.address1.limit -
										1 -
										remaining.address1.length
									}`}</em>
								</span>
								<input
									{...register('address1')}
									type="text"
									name="address1"
									id="address1"
									onChange={onInputChange}
									maxLength={remaining.address1.limit}
								/>
								<label htmlFor="address2">Address 2</label>
								<span id="address2Limit">
									<em>{`Field limited to ${
										remaining.address2.limit - 1
									} characters. Characters remaining: ${
										remaining.address2.limit -
										1 -
										remaining.address2.length
									}`}</em>
								</span>
								<input
									{...register('address2')}
									type="text"
									name="address2"
									id="address2"
									onChange={onInputChange}
									maxLength={remaining.address2.limit}
								/>
								<label htmlFor="city">City</label>
								<span id="cityLimit">
									<em>{`Field limited to ${
										remaining.city.limit - 1
									} characters. Characters remaining: ${
										remaining.city.limit -
										1 -
										remaining.city.length
									}`}</em>
								</span>
								<input
									{...register('city')}
									type="text"
									name="city"
									id="city"
									onChange={onInputChange}
									maxLength={13}
								/>
								<label id="state" htmlFor="state">
									State
								</label>
								<Controller
									name="state"
									control={control}
									render={({ field }) => (
										<Select
											{...field}
											classNamePrefix="react-select"
											options={states}
											value={data.state}
											onChange={(data) => {
												onSelectChange({
													...data,
													name: 'state',
												})
											}}
										/>
									)}
								/>
								<label htmlFor="zipCode">Zip Code</label>
								<span id="zipCodeLimit">
									<em>{`Field limited to ${
										remaining.zipCode.limit - 1
									} characters. Characters remaining: ${
										remaining.zipCode.limit -
										1 -
										remaining.zipCode.length
									}`}</em>
								</span>
								<input
									{...register('zipCode')}
									type="text"
									name="zipCode"
									id="zipCode"
									onChange={onInputChange}
									maxLength={remaining.zipCode.limit}
								/>
							</>
						)}
						{walkURL && data.affiliation.value !== 'Chapter' && (
							<>
								<label htmlFor="URL">Walk URL alias</label>
								<span id="URLLimit">
									<em>{`Field limited to ${
										remaining.URL.limit - 1
									} characters. Characters remaining: ${
										remaining.URL.limit -
										1 -
										remaining.URL.length
									}`}</em>
								</span>
								<div id="urlWrapper">
									<span>
										<em>afsp.org/</em>
									</span>
									<input
										{...register('URL')}
										value={data.url ? data.url : ''}
										type="text"
										name="URL"
										id="URL"
										onChange={onInputChange}
										maxLength={remaining.URL.limit}
									/>
								</div>
							</>
						)}
					</>
				)}
			<div className="submit-wrapper">
				{disabled && (
					<span style={{ color: '#eb1426' }}>
						There is a problem with your submission. Please check
						your entries above for more information.
					</span>
				)}
				<input type="submit" value="Download PDF" disabled={disabled} />
			</div>
		</form>
	)
}

export default BusinessCardForm
