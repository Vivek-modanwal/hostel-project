import React from "react";
class SearchPanel extends React.Component {
    state = {
        submitting: false
    };
    handleSubmit = e => {
        e.preventDefault();
        this.setState(() => ({ submitting: true }));
        const data = {};
        const search = e.target.elements.search.value.trim();
        if (!search) data.search = null;
        else {
            let re = /^[A-Za-z ]+$/;
            if (re.test(search)) {
                data.search = `name=${search}`;
            } else {
                data.search = `userid=${search}`;
            }
        }
        data.sortBy = e.target.elements.sortBy.value;
        data.order = e.target.elements.order.value;
        this.props.submitted(data);
        this.setState(() => ({ submitting: false }));
    };
    render() {
        return (
            <form className="spWrapper" onSubmit={this.handleSubmit}>
                <span className="spout">
                    SortBy:{"  "}
                    <select name="sortBy" className="spbox spsortBy">
                        <option value="rank">Rank</option>
                        <option value="name">userName</option>
                    </select>
                </span>
                <span className="spout">
                    Order:{"  "}
                    <select name="order" className="spbox sporder">
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </span>
                <span className="spout">
                    Search:{"  "}
                    <input
                        type="text"
                        name="search"
                        placeholder="e.g. Name or Userid"
                        className="spbox spsearch"
                    />
                    <input
                        type="submit"
                        name="submit"
                        value="Find"
                        className="spsubmit"
                        disabled={this.state.submitting}
                    />
                </span>
            </form>
        );
    }
}

export default SearchPanel;
