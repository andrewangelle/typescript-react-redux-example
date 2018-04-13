import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../store'
import { fetchPostsData } from '../store/posts/actions'
import { filterSelector } from '../selectors/posts';
import Table  from 'antd/lib/table';
import LoadingIndicator from '../components/LoadingIndicator';
import Animate from '../components/Animate';
import UITableHeader from './UITableHeader';
import '../styles/table.scss';

interface State {
  filteredPosts: any;
  loading: boolean;
};
interface Props {
  fetchPostsData: typeof fetchPostsData;
};


class UITable extends React.Component<State & Props> {
  componentDidMount() {
    this.props.fetchPostsData();
  }
  render() {
    const { filteredPosts, loading } = this.props;
    const rowKey = () => Math.random().toString(36).substr(2, 9)
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
              rowKey={() => rowKey()}
              pagination={false}
              scroll={{ y: '100vh' }}
              >
              <Column
                title={(
                  <UITableHeader
                    title={'User Id'}
                    values={filteredPosts.userIdValues}
                   />
                 )}
                dataIndex={'userId'}
                key={'userId'}
                width={100}
              />
              <Column
                title={(
                  <UITableHeader
                    title={'Id'}
                    values={filteredPosts.idValues}
                   />
                 )}
                dataIndex={'id'}
                key={'id'}
                width={100}
              />
              <Column
                title={(
                  <UITableHeader
                    title={'Title'}
                    values={['A-Z', 'Z-A']}
                   />
                 )}
                dataIndex={'title'}
                key={'title'}
                width={200}
              />
              <Column
                title={(
                  <UITableHeader
                    title={'Body'}
                    values={['A-Z', 'Z-A']}
                   />
                 )}
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


 /*import { RouteComponentProps } from 'react-router-dom'
import { withRouter, RouterProps } from 'react-router'*/