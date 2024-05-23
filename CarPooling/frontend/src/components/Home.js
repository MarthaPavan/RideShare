
const Home = () => {
    return (  
        <>
            <div className="container">
                    <br />
                    <br />
                <div className="row">
                    <div className="col-sm-6 city-banner hyd p-5">
                        <h2 className="display-4 text-light mb-5 pb-5">Hyderabad.</h2>
                        <h4 className="text-light">Daily 44000+ People <br />Carpool in Hyderabad</h4>
                        <h6 className="text-light">The future of commuting is here.</h6>
                    </div>
                <div className="col-sm-6 city-page-data p-5">
          <div className="row pl-5">
            <div className="col-sm-3 " align="left" style={{ width: '50%' }}>
                <i class="bi bi-car-front-fill qr-opac-50"></i>
            </div>
            <div className="col-sm-9" style={{ width: '50%' }}>
              <h4 className="qr-regular">20 Million +</h4>
              <h6 className="qr-green qr-bold">Rides Shared</h6>
            </div>
          </div>
          <div className="row mt-3 pl-5" style={{ marginTop: '50px' }}>
            <div className="col-sm-3" align="left" style={{ width: '50%' }}>
                
            </div>
            <div className="col-sm-9" style={{ width: '50%' }}>
              <h4 className="qr-regular">1 Million +</h4>
              <h6 className="qr-green qr-bold">Users</h6>
            </div>
          </div>
          <div className="row mt-3 pl-5" style={{ marginTop: '50px' }}>
            <div className="col-sm-3" align="left" style={{ width: '50%' }}>
              <img src="https://storage.googleapis.com/quickride-in/images/co2 icon.png" alt="CO2 Icon" className="qr-opac-50" style={{ width: '80%' }} />
            </div>
            <div className="col-sm-9" style={{ width: '50%' }}>
              <h4 className="qr-regular">41000 + Tons</h4>
              <h6 className="qr-green qr-bold">CO2 Prevented</h6>
            </div>
          </div>
        </div>
            </div>
            </div>
        </>
    );
}
 
export default Home;