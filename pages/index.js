
export default class extends React.Component {
  render() {
    return (
      <div>
        <h1>¡Hola mundo!</h1>
        <p>Bienvenidos al curso de Next JS</p>


        <img src="platzi.png" alt="Platzi" />
        <style jsx>
          {`
            h1 {
              color: red;
            }
            :global(p) {
              color: green;
            }
            img {
              max-width: 50%;
              display: block;
              margin: 0 auto;
            }
          `}

        </style>

        <style jsx global>
          {`
              body {
                 background: white;
              }
          `}
        </style>

      </div>
    )
  }
}