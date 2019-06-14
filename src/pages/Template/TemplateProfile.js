import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import { formatMessage, FormattedMessage } from 'umi/locale';
import MonacoEditor from 'react-monaco-editor';

const { Description } = DescriptionList;

const typeMap = new Map([[0, 'Velocity'], [1, 'Freemarker']]);

@connect(({ template, loading }) => ({
  template,
  loading: loading.effects['template/fetchById'],
}))
class TemplateProfile extends Component {
  state = {
    data: {},
  };

  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;

    if (id) {
      dispatch({
        type: 'template/fetchById',
        payload: id,
        callback: response => {
          this.setState({
            data: response,
          });
        },
      });
    }
  }

  render() {
    const { loading } = this.props;

    const { data } = this.state;

    const options = {
      //selectOnLineNumbers: true,
      readOnly: true,
    };
    return (
      <PageHeaderWrapper title={<FormattedMessage id="app.template.info.title" />}>
        <Card bordered={false} loading={loading}>
          <DescriptionList size="large" style={{ marginBottom: 32 }}>
            <Description term="ID">{data.id}</Description>
            <Description term={<FormattedMessage id="app.template.name" />}>
              {data.name}
            </Description>
            <Description term={<FormattedMessage id="app.template.type" />}>
              {typeMap.get(data.type)}
            </Description>
            <Description term={<FormattedMessage id="table.createTime" />}>
              {moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')}
            </Description>
            <Description term={<FormattedMessage id="table.updateTime" />}>
              {moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')}
            </Description>
          </DescriptionList>
          <div style={{ paddingBottom: 16 }}>
            <FormattedMessage id="app.template.content" />
          </div>
          <MonacoEditor
            value={data.content}
            width="100%"
            height="600"
            options={options}
            language="plaintext"
            theme="vs-dark"
          />
          {/* <pre
            style={{
              background: '#272822',
              padding: 10,
              overflow: 'auto',
              color: '#fff',
              fontSize: '1em',
            }}
          >
            {data.content}
          </pre> */}
          <Divider style={{ marginBottom: 32 }} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TemplateProfile;
