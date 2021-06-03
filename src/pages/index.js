import React, { useState, useRef, useEffect } from "react"
import { css } from "@emotion/react"
import useImage from "use-image"

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
  font-family: "AvenirNextLTPro-Regular";
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
  const [print, setPrint] = useState(false)
  const [cardFront, setCardFront] = useState(null)
  const [cardFrontImage] = useImage(cardFront)
  const [cardBack, setCardBack] = useState(null)
  const [cardBackImage] = useImage(cardBack)
  const cardRef = useRef(null)

  return (
    <div css={appCSS} className="App">
      <p css={instructionsCSS}>
        Complete the fields below to create your printable business card. Please
        check the PDF you download for any errors or issues as this is the file
        that will be printed at home, online, or by your local printer. If
        you're not sure where to print, we recommend{" "}
        <a
          href="https://www.vistaprint.com/business-cards/rounded-corner?xnid=TopNav_Rounded+Corner+Business+Cards_Premium+Shapes_Business+Cards&xnav=TopNav"
          target="_blank"
          rel="noreferrer noopener"
        >
          Vistaprint
        </a>
        . Depending on your internet connection speed, creating your card may
        take up to 15-20 seconds.
      </p>
    </div>
  )
}
