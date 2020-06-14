import React from 'react'

export default class extends React.Component {
  render() {
    return (
      <div>

        <img src="platzi.png" alt="Platzi" />
        <h1>Creado por Stiven</h1>
        <p>¡Este curso está que arde!</p>
        <style jsx>
          {`
          div{
            padding: 5rem;
          }
          img{
            max-width: 50%;
            display: block;
            margin: 0 auto;
          }
          h1 {
            text-align: center;
            color: white;
            margin-top: 6rem;
            font-family: calibri;
          }
          p {
            text-align: center;
            color: white;
            font-family: calibri;
          }
          :global(body) {
              background-color: #001A2B;
          }
        `}

        </style>
      </div>


    )
  }
}