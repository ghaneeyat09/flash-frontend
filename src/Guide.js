const Guide = () => {
    return(
        <div id="guide">
            <div className="logoStyle">
                <h1 className="eff">f</h1>
                <h3 className="lash">lash</h3>
           </div>
           <h2>Admin experience made easy...</h2>
           <h3 className="instruction">We implore the admin to go through this guide to assist him/her in using this software application</h3>
           <div className="guideIt">
           <div className="editLocation">
            <div className="content">
              <h3 className="header">To add present location</h3>
              <ul>
                  <li>check for "present location" column, precisely the 8th column</li>
                  <li>identify the order you want to edit(by adding present location) on the column</li>
                  <li>click on the already existing location or the middle of the box</li>
                  <li>fill in the popup box with the present location of the parcel delivery order</li>
                  <li>you receive a message short while after</li>
              </ul>
              </div>
           </div>
           <div className="editOrderStatus">
            <div className="content">
              <h3 className="header">To change the parcel delivery order status</h3>
              <ul>
                  <li>check for "edit" column, precisely the 9th column</li>
                  <li>identify the order you want to edit(by changing the status to either "on transit" or "delivered") on the column</li>
                  <li>click on the pen icon or the middle of the box</li>
                  <li>fill in the popup box with the current status of the parcel delivery order</li>
                  <li>you receive a message short while after</li>
                  <li>NB: You cannot change the status of an order that has already been delivered</li>
              </ul>
           </div>
           </div>
           <div className="deleteOrder">
            <div className="content">
              <h3 className="header">To delete a particular order</h3>
              <ul>
                  <li>check for "delete" column, precisely the 10th column</li>
                  <li>identify the order you want to delete on the column</li>
                  <li>click on the trash icon within the box</li>
                  <li>click OK in the popup box if you truly want to delete the order</li>
                  <li>you receive a message short while after</li>
                  <li>NB: You cannot delete an order that has a status of "ready to pick" or "ontransit"</li>
              </ul>
           </div>
           </div>
           </div>
           <h3 className="instruction">for more enquiries, contact +2348143130290</h3>
        </div>
    )
}

export default Guide;