import { CSSProperties } from 'react';
import { Badge, Table } from 'antd';
import { useOne, useParsed } from '@refinedev/core';
import FormRole from './FormRole';
import { RuleUser } from '@/types/rule';
import useServices from '@/hooks/rule/services';
import { methods, status } from '@/constants/filter';
import { Method } from '@/types/global';
import { colorMethod } from '@/constants/colors';

const styleWrapper: CSSProperties = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
};

const Role = () => {
    const parsed = useParsed();
    const { filterServices } = useServices();
    const rules = useOne<{
        rules: RuleUser[];
        total: number;
    }>({
        resource: 'user/rules',
        id: parsed.id,
    });

    return (
        <div style={styleWrapper}>
            <FormRole />
            <div style={{ paddingBlock: '20px' }}>
                <h3>Có {rules.data?.data.total} rules truy cập: </h3>
                <Table dataSource={rules.data?.data.rules}>
                    <Table.Column
                        title="Service"
                        dataIndex={'service'}
                        filters={filterServices}
                        onFilter={(value, record) => record.service === value}
                    />
                    <Table.Column
                        title="Method"
                        dataIndex={'method'}
                        filters={methods}
                        onFilter={(value, record) => record.method === value}
                        render={(method: Method) => {
                            return (
                                <Badge
                                    className="site-badge-count-109"
                                    count={method}
                                    style={{
                                        backgroundColor: colorMethod[method],
                                        marginRight: '4px',
                                    }}
                                />
                            );
                        }}
                    />
                    <Table.Column title="Path" dataIndex={'path'} />
                    <Table.Column
                        title="Is Private"
                        dataIndex={'isPrivate'}
                        filters={status}
                        onFilter={(value, record) => record.isPrivate === value}
                        render={(isPrivate: boolean) => (
                            <>{isPrivate ? 'TRUE' : 'FALSE'}</>
                        )}
                    />
                </Table>
            </div>
        </div>
    );
};

export default Role;
