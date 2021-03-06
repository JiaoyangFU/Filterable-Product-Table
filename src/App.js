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
		const filterText = this.props.filterText;
		const inStockOnly = this.props.inStockOnly;
		const products = this.props.products;
		let lastCategory = null;
		let rows = [];

		products.forEach((product) => {
			if (product.name.indexOf(filterText) === -1) {
				return;
			}
			if (inStockOnly && !product.stocked) {
				return;
			}

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
	constructor(props) {
		super(props);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleInStockChange = this.handleInStockChange.bind(this);
	}

	handleFilterTextChange(e) {
		this.props.onFilterTextChange(e.target.value);
	}

	handleInStockChange(e) {
		this.props.onInStockChange(e.target.checked);
	}
	render() {
		const filterText = this.props.filterText;
		const inStockOnly = this.props.inStockOnly;

		return (
			<form>
				<input
					type="text"
					placeholder="Searching .."
					value={filterText}
					onChange={this.handleFilterTextChange}/>
				<p>
					<input
						type="checkbox"
						checked={inStockOnly}
						onChange={this.handleInStockChange}/>
					Only show products in stock
				</p>
			</form>
		);
	}
}

class FilterableProductTable extends Component {
	constructor (props) {
		super(props);
		this.state = {
			filterText: ' ',
			inStockOnly: false
		};
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleInStockChange = this.handleInStockChange.bind(this);
	}


	handleFilterTextChange(filterText) {
		this.setState({
			filterText: filterText
		});
	}

	handleInStockChange(inStockOnly) {
		this.setState({
			inStockOnly: inStockOnly
		})
	}

	render () {
		return (
			<div className="main-table">
				<SearchBar
					filterText={this.state.filterText}
					isStockOnly={this.state.inStockOnly}
					onFilterTextChange={this.handleFilterTextChange}
					onInStockChange={this.handleInStockChange} />

				<ProductTable
					products={this.props.products}
					filterText={this.state.filterText}
					isStockOnly={this.state.inStockOnly}/>
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
