import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class ProductRow extends Component {
	render () {
		const product = this.props.product;
		const name = product.stocked ?
			product.name :
			<span style={{color: 'pink'}}>
				{product.name}
			</span>
		return (
			<tr>
				<td> {name} </td>
				<td> {product.price} </td>
			</tr>
		);
	}
}

class ProductCategoryRow extends Component {
	render () {
		const category = this.props.category;
		return (
			<tr>
				<th colSpan="2">
					{category}
				</th>
			</tr>
		);
	}
}

class ProductTable extends Component {
	render () {
		const products = this.props.products;
		let lastCategory = null;
		let rows = [];

		products.forEach((product) => {
			if (product.category !== lastCategory) {
				rows.push(
					<ProductCategoryRow category={product.category}
						key={product.category}/>
				);
			}

			rows.push(
				<ProductRow product={product}
							key={product.name} />
			);

			lastCategory = product.category;
		});

		return (
			<table>
				<thead>
					<tr>
						<th> Name </th>
						<th> Price </th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}
}

class SearchBar extends Component {
	render() {
		return (
			<form>
				<input type="text" placeholder="Searching .." />
				<p>
					<input type="checkbox" />
					Only show products in stock
				</p>
			</form>
		);
	}
}

class FilterableProductTable extends Component {
	render () {
		return (
			<div className="main-table">
				<SearchBar />
				<ProductTable products={this.props.products}/>
			</div>
		);
	}
}

const PRODUCTS = [
	{category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
	{category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
	{category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
	{category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
	{category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
	{category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

class App extends Component {
  render () {
	  return (
	      <FilterableProductTable products={PRODUCTS} />
    );
  }
}

export default App;