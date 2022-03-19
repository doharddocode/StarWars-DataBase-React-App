import React, { Component } from 'react';

import './item-details.css';
import Spinner from "../load-spinner";

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{ item[field] }</span>
    </li>
  );
};

export {
  Record
};

export default class ItemDetails extends Component {

  state = {
    item: null,
    loading: false,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId ||
        this.props.getData !== prevProps.getData ) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData } = this.props;
    if (!itemId) {
      return;
    }

    this.setState({
      loading: true
    })
    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          loading: false
        });
      });
  }

  render() {
    const { item } = this.state;

    if (this.state.loading || !item) {
      return <Spinner />;
    }

    const { name } = item;

    return (
      <div className="item-details card">
        <img className="item-image"
          src={ item.imageUrl }
          alt="item"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
