// external deps, type defs, utils
import React, { Component } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// app level type defs & utils
import { RootState } from '../store';
import { fetchPostsData } from '../store/posts/actions';
import { filterSelector } from '../store/posts/selectors';

// UI related imports
import Table  from 'antd/lib/table';
import LoadingIndicator from '../components/LoadingIndicator';
import Animate from '../components/Animate';
import UITableHeader from './UITableHeader';
import '../styles/table.scss';

// component level type defs
type State = {
  filteredPosts: any;
  loading: boolean;
};
interface Props {
  fetchPostsData: typeof fetchPostsData;
};


class UITable extends Component<State & Props> {
  componentDidMount() {
    this.props.fetchPostsData();
  }
  render() {
    const { filteredPosts, loading } = this.props;
    let Column = Table.Column;
    return (
      <div className="App">
        {loading &&
          <LoadingIndicator message={'Loading...'} />
        }
        {!loading && filteredPosts.data &&
          <Animate>
            <Table
              dataSource={filteredPosts.data}
              rowKey={() => Math.random().toString(36).substr(2, 9)}
              pagination={false}
              scroll={{ y: '100vh' }}
            >
              <Column
                title={(<UITableHeader title={'User Id'} values={filteredPosts.userIdValues}/>)}
                dataIndex={'userId'}
                key={'userId'}
                width={100}
              />
              <Column
                title={(<UITableHeader title={'Id'} values={filteredPosts.idValues}/>)}
                dataIndex={'id'}
                key={'id'}
                width={100}
              />
              <Column
                title={(<UITableHeader title={'Title'} values={['A-Z', 'Z-A']}/>)}
                dataIndex={'title'}
                key={'title'}
                width={200}
              />
              <Column
                title={(<UITableHeader title={'Body'} values={['A-Z', 'Z-A']} />)}
                dataIndex={'body'}
                key={'body'}
                width={200}
              />
            </Table>
          </Animate>
        }
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): State => ({
  loading: state.posts.loading,
  filteredPosts: filterSelector(state)
});
const mapDispatchToProps = (dispatch: Dispatch<State>): Props => ({
  ...bindActionCreators({fetchPostsData}, dispatch)
})

export default connect<State, Props>(
  mapStateToProps,
  mapDispatchToProps
 )(UITable);