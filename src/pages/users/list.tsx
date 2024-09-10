import { DateField, UrlField, useTable } from '@refinedev/antd';
import { BaseRecord } from '@refinedev/core';
import { Badge, Flex, Table, Tag } from 'antd';
import { List } from '@/components/crud/list';
import { Role } from '@/types/global';
import { Link } from 'react-router-dom';
import { sorter } from '@/libs/helper';

export const UserList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
        pagination: {
            mode: 'server',
        },
    });
    return (
        <List titleType="singular" canCreate={false}>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="full_name"
                    title={'Họ & Tên'}
                    render={(value, record: BaseRecord) => (
                        <Link to={`/users/${record.id}`}>
                            {value || 'Chưa có'}
                        </Link>
                    )}
                    sorter={sorter('full_name')}
                />
                <Table.Column
                    dataIndex="email"
                    title={'Email'}
                    render={(value) => (
                        <Link to={`mailto:${value}`}>{value}</Link>
                    )}
                    sorter={sorter('email')}
                />
                <Table.Column
                    dataIndex="phone"
                    title={'Số điện thoại'}
                    render={(value) => <Link to={`tel:${value}`}>{value}</Link>}
                />
                <Table.Column
                    dataIndex={'link_cv'}
                    title={'CV'}
                    render={(value: string | null) =>
                        value ? (
                            <UrlField value={value} target="_blank">
                                Xem CV
                            </UrlField>
                        ) : (
                            'Chưa có'
                        )
                    }
                />
                <Table.Column
                    width={300}
                    dataIndex={['roles']}
                    title={'Quyền'}
                    render={(roles: Role[]) => {
                        return (
                            <Flex gap="8px 0" wrap>
                                {roles.map((role) => (
                                    <Tag style={{ fontWeight: 600 }}>
                                        {role.name}
                                    </Tag>
                                ))}
                            </Flex>
                        );
                    }}
                />
                <Table.Column
                    dataIndex={['status']}
                    title={'Trạng thái'}
                    render={(value: boolean) => {
                        return (
                            <Badge
                                className="site-badge-count-109"
                                count={value ? 'Kích hoạt' : 'Vô hiệu hóa'}
                                style={{
                                    backgroundColor: value
                                        ? '#399918'
                                        : '#FF0000',
                                    color: 'white',
                                }}
                            />
                        );
                    }}
                />
                <Table.Column
                    dataIndex={['created_at']}
                    title={'Ngày tạo'}
                    render={(value: string) => <DateField value={value} />}
                    sorter={sorter('created_at')}
                />
            </Table>
        </List>
    );
};
