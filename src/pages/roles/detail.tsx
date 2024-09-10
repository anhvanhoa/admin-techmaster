import { Show } from '@/components/crud/show';
import { colorMethod } from '@/constants/colors';
import { methods, status } from '@/constants/filter';
import useRole from '@/hooks/role/role';
import { Method } from '@/types/global';
import { RuleByRole } from '@/types/rule';
import { SearchOutlined } from '@ant-design/icons';
import { FilterDropdown } from '@refinedev/antd';
import { getDefaultFilter } from '@refinedev/core';
import { Badge, Input, Table, Typography } from 'antd';

const DetailRole = () => {
    const { tableRole, name } = useRole();
    return (
        <Show title={`Chi tiết ${name}`}>
            <Typography.Title level={5}>
                Số lượng rule phụ thuộc
            </Typography.Title>
            <div style={{ marginTop: '16px' }}>
                {name === 'admin' && (
                    <p style={{ textAlign: 'center' }}>
                        Có quyền truy cập tất cả
                    </p>
                )}
                {name !== 'admin' && (
                    <Table<RuleByRole> {...tableRole.tableProps}>
                        <Table.Column
                            dataIndex="id"
                            title="ID"
                            render={(value) => (
                                <Typography.Text style={{ fontWeight: '500' }}>
                                    {value}
                                </Typography.Text>
                            )}
                            sorter={(a, b) => {
                                return a.id - b.id;
                            }}
                        />
                        <Table.Column
                            dataIndex="service"
                            title="Service"
                            render={(value) => (
                                <Typography.Text>{value}</Typography.Text>
                            )}
                            filters={[
                                { text: 'admin', value: 'admin' },
                                { text: 'main', value: 'main' },
                            ]}
                        />
                        <Table.Column
                            dataIndex="path"
                            title="Path"
                            filterIcon={<SearchOutlined />}
                            defaultFilteredValue={getDefaultFilter(
                                'path',
                                tableRole.filters,
                                'eq',
                            )}
                            filterDropdown={(props) => (
                                <FilterDropdown {...props}>
                                    <Input style={{ width: '100%' }} />
                                </FilterDropdown>
                            )}
                        />
                        <Table.Column
                            dataIndex="method"
                            title="Method"
                            filters={methods}
                            onFilter={(value, record) =>
                                record.method === value
                            }
                            render={(method: Method) => {
                                return (
                                    <Badge
                                        className="site-badge-count-109"
                                        count={method}
                                        style={{
                                            backgroundColor:
                                                colorMethod[method],
                                            marginRight: '4px',
                                        }}
                                    />
                                );
                            }}
                        />
                        <Table.Column
                            dataIndex="isPrivate"
                            title="Is Private"
                            render={(value) => (
                                <Typography.Text>
                                    {value ? 'Private' : 'Public'}
                                </Typography.Text>
                            )}
                            filters={status}
                            onFilter={(value, record) =>
                                record.isPrivate === value
                            }
                        />
                    </Table>
                )}
            </div>
        </Show>
    );
};

export default DetailRole;
