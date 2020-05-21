import React from 'react'

const Home = ()=>{
    return (
        <div className="home">
            <div className="card home-card">
                <h5>Duncan</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1582221274032-7ad8b9a6df05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                    <div className="card-content">
                        <h6>title</h6>
                        
  <i className="material-icons" style={{color:"red"}}>favorite</i>
            
                        <p>It is amazing post</p>
                        <input type="text" placeholder="add comment" />
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Home