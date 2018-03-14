export default transactions => ({
  center: { lat: -33.928513, lng: 151.154053 },
  markers: 
    transactions
    .map(transaction =>{
      return ({
      position: {
        lat: transaction.lat,
        lng: transaction.lng
      }
    })
  })
});