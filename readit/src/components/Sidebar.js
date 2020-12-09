import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from '../utils/axios'



function Sidebar(props) {

    useEffect(() => {
        async function fetchData() {
            try {
                const tempSubs = await axios.get('/r')
                // props.getSubs(tempSubs.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    const history = useHistory()

    const subLinkHandler = (name) => {
        history.push(`/r/${name}`)
    }

    const postHandler = (e) => {
        e.preventDefault()
        history.push('/postform')
    }

    const subHandler = (e) => {
        e.preventDefault()
        history.push('/subform')
    }

    return (
        <div>
            <button className="myButtonP" onClick={postHandler}>Create Post</button>
            <button className="myButtonS" onClick={subHandler}>Create Sub</button>
            <div style={{ textAlign: "center", margin: "15px 0" }}>subreadits</div>
            {
                props.subreadits.map(s => {
                    return <div className="subs">
                        <div onClick={() => subLinkHandler(s.name)} className="sub">r/{s.name}</div>

                    </div>
                })
            }
        </div >
    )
}

function mapStateToProps(state) {
    return {
        subreadits: state.subreadits
    }
}
export default connect(mapStateToProps, {})(Sidebar)
