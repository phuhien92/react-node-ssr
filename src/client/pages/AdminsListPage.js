import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from '../actions';

class AdminsListPage extends Component {
    componentDidMount () {
        this.props.fetchAdmins();
    }
    
    render() {
        return (
            <div>
                <h3>Producted list of admins</h3>
            </div>
        )
    }
}

function mapStateToProps({admins}) {
    return { admins }
};

export default {
    component: connect(mapStateToProps, { fetchAdmins })(AdminsListPage),
    loadData: ({dispatch}) => dispatch(fetchAdmins())
}