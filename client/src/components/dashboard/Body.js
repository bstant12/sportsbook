import React,{useState, useEffect} from 'react';
import Axios from 'axios';
import {navigate} from '@reach/router'


const Body = (props) => {


    const [gamesSpreads, setGamesSpreads] = useState([]);
    const [gamesTotals, setGamesTotals] = useState([]);

    const [bet, setBet] = useState({
        home_team:"",
        away_team:"",
        site:"",
        bet_type:"",
        my_odds:"",
        amount:0
    });

    const style = {
        textDecoration: "underline"
    }


    const [leagues, setLeagues] = useState([]);

    const api_key = process.argv[2] || '499344a1d48ef3f0d979032257a824c4'
    const [sport_key, setSports_Key] = useState('upcoming'); // use the sport_key from the /sports endpoint below, or use 'upcoming' to see the next 8 games across all sports
    const [region, setRegion] = useState('us'); // uk | us | eu | au
    // const [market, setMarket] = useState('spreads'); // h2h | spreads | totals

    /*
        First get a list of in-season sports 
        the sport 'key' from the response can be used to get odds in the next request
    */
    useEffect(() => {
        Axios.get('https://api.the-odds-api.com/v3/sports', {
            params: {
                api_key: api_key
            }
        })
            .then(response => {
                setLeagues(response.data.data)
            })
            .then(response => {
                console.log(response.data.data)
            })
            .catch(error => {
                // console.log('Error status', error.response.status)
                console.log("this sucks 1")
            })
    }, [] )

    /*
        Now get a list of live & upcoming games for the sport you want, along with odds for different bookmakers
    */
    useEffect(() => {
        Axios.get(`https://api.the-odds-api.com/v3/odds/?apiKey=${api_key}&sport=${sport_key}&region=${region}&mkt=spreads`)
            .then(response => {
                setGamesSpreads(response.data.data)
            })
            .then(response => {
                // response.data.data contains a list of live and 
                // upcoming events and odds for different bookmakers.
                // Events are ordered by start time (live events are first)
                console.log(JSON.stringify(response.data.data))

                // Check your usage
                console.log('Remaining requests',response.headers['x-requests-remaining'])
                console.log('Used requests',response.headers['x-requests-used'])
            })
            .catch(error => {
                // console.log('Error status', error.response.status)
                console.log('this sucks 2')
            })
    },[])

    useEffect(() => {
        Axios.get(`https://api.the-odds-api.com/v3/odds/?apiKey=${api_key}&sport=${sport_key}&region=${region}&mkt=totals`)
            .then(response => {
                setGamesTotals(response.data.data)
            })
            .then(response => {
                // response.data.data contains a list of live and 
                // upcoming events and odds for different bookmakers.
                // Events are ordered by start time (live events are first)
                console.log(JSON.stringify(response.data.data))

                // Check your usage
                console.log('Remaining requests',response.headers['x-requests-remaining'])
                console.log('Used requests',response.headers['x-requests-used'])
            })
            .catch(error => {
                // console.log('Error status', error.response.status)
                console.log('this sucks 2')
            })
    },[])


    const handleSubmit = bet => {
        Axios.post('http://localhost:8000/api/bet')
            .then(res => console.log(res))
            .catch(navigate('/dashboard'))
    }


    return (
        <div>
            <div >
                <br/>
                <h2 className="text-center">TODAYS GAMES</h2>
                <br/>
            </div>

            <ul  className="nav nav-tabs">
                {/* <li className="nav-item active">
                    <a className="btn btn-primary nav-link" href="#1a" data-toggle="tab">Head To Head</a>
                </li> */}
                <li>
                    <a className="btn btn-info nav-link" href="#2a" data-toggle="tab">Totals</a>
                </li>
                <li>
                    <a className="btn btn-primary nav-link" href="#3a" data-toggle="tab">Spreads</a>
                </li>
		    </ul>

			<div className="tab-content clearfix">
	            {/* <div className="tab-pane active" id="1a">
                    <h3>hjfhgfhgfhgfhgfhgfhgfhgfhgf</h3>









				</div> */}
				<div className="tab-pane active" id="2a">
                    <div >
                        <h3 className="text-center">TOTALS</h3>
                    </div>
                    {
                        gamesTotals.map((game, idx) => {
                            return(
                                <div key={idx} className='card col-8 mx-auto'>
                                    <p><b>LEAGUE:</b> {game.sport_nice}</p>
                                    <h5>{game.teams[0]} vs. {game.teams[1]}</h5>
                                    <p>Home Team: {game.home_team}</p>
                                    <ul className="list-inline">
                                    {
                                        game.sites.map((ga, index) => {
                                            return(
                                                <div>
                                                    <div className="card p-3 mb-2">
                                                        <li className="list-inline-item" key={index}><h6>{ga.site_nice}</h6></li>
                                                        <p style={style}>Under/Over: {ga.odds.totals.points[0]}</p>

                                                        <form  onSubmit={handleSubmit}>
                                                            <label>Bet</label>

                                                            <input type="hidden" name="home_team" value={game.teams[0]} />
                                                            <input type="hidden" name="away_team" value={game.teams[1]} />
                                                            <input type="hidden" name="site" value={ga.site_nice} />
                                                            <input type="hidden" name="bet_type" value="Spread" />
                                                            <input type="hidden" name="my_odds" value={ga.odds.totals.points[0]} />

                                                            <input type="number" name="amount" onChange={(e) => setBet(e.target.value)}/>

                                                            <input className="btn btn-success" type="submit" value="MAKE BET!" />
                                                        </form>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    </ul>
                                </div>
                            )
                        })
                    }
				</div>


                <div className="tab-pane" id="3a">
                    <div >
                        <h3 className="text-center">SPREADS</h3>
                    </div>
                    {
                        gamesSpreads.map((game, idx) => {
                            return(
                                <div key={idx} className='card col-8 mx-auto'>
                                    <p><b>LEAGUE:</b> {game.sport_nice}</p>
                                    <h5>{game.teams[0]} vs. {game.teams[1]}</h5>
                                    <p>Home Team: {game.home_team}</p>
                                    <ul className="list-inline">
                                    {
                                        game.sites.map((ga, index) => {
                                            return(
                                                <div>
                                                    <div className="card p-3 mb-2">
                                                        <li className="list-inline-item" key={index}><h6>{ga.site_nice}</h6></li>
                                                        <p style={style}>Spreads</p>
                                                        <p>{game.teams[0]}: {ga.odds.spreads.points[0]}</p>
                                                        <form  onSubmit={handleSubmit}>
                                                            <label>Bet</label>

                                                            <input type="hidden" name="home_team" value={game.teams[0]} />
                                                            <input type="hidden" name="away_team" value={game.teams[1]} />
                                                            <input type="hidden" name="site" value={ga.site_nice} />
                                                            <input type="hidden" name="bet_type" value="Spread" />
                                                            <input type="hidden" name="my_odds" value={ga.odds.spreads.points[0]} />

                                                            <input type="number" name="amount" onChange={(e) => setBet(e.target.value)}/>

                                                            <input className="btn btn-success" type="submit" value="MAKE BET!" />
                                                        </form>
                                                        <hr/>
                                                        <p>{game.teams[1]}: {ga.odds.spreads.points[1]}</p>
                                                        <form onSubmit={handleSubmit}>
                                                            <label>Bet</label>

                                                            <input type="hidden" name="home_team" value={game.teams[0]} />
                                                            <input type="hidden" name="away_team" value={game.teams[1]} />
                                                            <input type="hidden" name="site" value={ga.site_nice} />
                                                            <input type="hidden" name="bet_type" value="Spread" />
                                                            <input type="hidden" name="my_odds" value={ga.odds.spreads.points[1]} />

                                                            <input type="number" name="amount" onChange={(e) => setBet(e.target.value)}/>

                                                            <input className="btn btn-success" type="submit" value="MAKE BET!" />
                                                        </form>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    </ul>
                                </div>
                            )
                        })
                    }
				</div>
			</div>





        </div>




    )
}

export default Body;