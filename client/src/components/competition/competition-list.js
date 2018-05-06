import React, {Component} from 'react';

/**
 * gql is a helper that allows us to write queries in a component javascript file as a template string.  A query is not valid javascript, but a template string is.  gql will convert the template string to a valid query when interfacing with Apollo.
 */
import gql from 'graphql-tag';

import {graphql} from 'react-apollo';
import {Link} from 'react-router';
import fetchCompetitions from '../queries/fetch-competitions';
import deleteCompetition from '../mutations/delete-competition';


class CompetitionList extends Component{
  // render() {
  //   //the console.log statement below logs data returned from the server.  The props object will have a "data" property on it that contains the returned data.  It is the graphql from react-apollo that allows the data property to be created on the props object. Specifically, the graphql called in the export statement at the end of this file.  The data object will have a property with the name of the query.  In this case it is "getAllCompetitions".  It is the "getAllCompetitions" property that will have the data we want to display. The full path is this.props.data.getAllCompetitions
  //   console.log(this.props);

  /**
   * the className="collection-item" appended to the end of the <li> element below is to enable in line CSS.
   */
  onCompetitionDelete(_id){
    this.props.mutate({variables: {_id: _id}})
    .then(() => this.props.data.refetch());

  }
/**
 * we are making location clickable below by including the {location} in the Link tag.
 */
  renderAllCompetitions() {
    return this.props.data.getAllCompetitions.map(({_id, location}) => {
      return (
        <li key={_id} className="collection-item">
          <Link to={`/competitions/${_id}`}>
            {location}
          </Link>
          <i className="materials-icons"
              onClick={ () => this.onCompetitionDelete(_id)}>delete</i>
        </li>
      );
    });
  }

  render() {
    /**
     * the if statement below takes care of scenario where the server has not responded with data yet.  Then in the renderAllCompetitions method above, we add the key={competition._id} entry for the <li> element created for each competition.
     * 
     * 
     * className="collection" is added to ul component below for in line CSS.
     */
    if(this.props.data.loading){return <div>Loading</div>};

    return (
      <div>
        <ul className="collection">
          {this.renderAllCompetitions()}
        </ul>
        <Link 
          to="/competitions/new"
          className="btn-floating btn-large red right"
          >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
} 

/**
 * whenever you have a query where you will returning a list/array of similar items, react needs a unique key for each item in the list.  To satisfy the requirement, request the _id or id (depending on schema) as part of the query.
 */
// const query = gql `
//   {
//   getAllCompetitions{
//     _id,
//     location,
//     dateOf
//   }
// }
// `;

/**
 * when this is called, the graphql(query) returns a function, that is immediately invoked with the parameter (CompetitionList).  Because we are using two separate graphql functions (mutation and query), we have to use the double call as shown below.
 */
export default graphql(deleteCompetition)(
  graphql(fetchCompetitions)(CompetitionList));
