import { List } from '@/components/crud/list';
import { RoleReponse } from '@/types/role';
import { DeleteOutlined } from '@ant-design/icons';
import { SaveButton } from '@refinedev/antd';
import { BaseRecord } from '@refinedev/core';
import { Button, Drawer, Form, Input, Modal, Table, Typography } from 'antd';
import { Link } from 'react-router-dom';
import GroupButton from './components/GroupButton';
import { sorter } from '@/libs/helper';
import useDrawer from '@/hooks/drawer';
import useConfirm from '@/hooks/role/confirm';
import useRoles from '@/hooks/role/roles';

const Roles = () => {
    const { closeDrawer, isOpen, openDrawer } = useDrawer();
    const { formCreate, table } = useRoles({ onMutationSuccess: closeDrawer });
    const {
        compareName,
        handleCancel,
        handleChangeName,
        handleConfirmDeleteRole,
        handleDeleteRole,
        roleConfirm,
        visible,
    } = useConfirm({ table });

    return (
        <div>
            <List
                breadcrumb={false}
                headerButtons={<GroupButton onCreate={openDrawer} />}
            >
                <Table {...table.tableProps} rowKey="id">
                    <Table.Column
                        dataIndex="id"
                        title={'ID'}
                        render={(value) => (
                            <Typography.Text style={{ fontWeight: '500' }}>
                                {value}
                            </Typography.Text>
                        )}
                        sorter={sorter<RoleReponse>('id')}
                    />
                    <Table.Column
                        dataIndex="name"
                        title={'Tên Role'}
                        render={(value, role: BaseRecord) => (
                            <Link to={`/roles/${role.id}/${role.name}`}>
                                {value}
                            </Link>
                        )}
                        sorter={(a, b) => a.name.localeCompare(b.name)}
                    />
                    <Table.Column
                        dataIndex="user_count"
                        title={'Số lượng người dùng'}
                        sorter={(a, b) => {
                            return a.user_count - b.user_count;
                        }}
                    />
                    <Table.Column
                        dataIndex="rule_count"
                        title={'Số lượng rule phục vụ'}
                        sorter={(a, b) => {
                            return a.rule_count - b.rule_count;
                        }}
                    />
                    <Table.Column
                        title={'Action'}
                        render={(_, item: RoleReponse) => (
                            <Button
                                disabled={item.name === 'admin'}
                                type="dashed"
                                danger
                                onClick={
                                    item.name !== 'admin'
                                        ? handleDeleteRole({
                                              ...item,
                                              ruleCount: item.rule_count,
                                              userCount: item.user_count,
                                              nameConfirm: '',
                                          })
                                        : undefined
                                }
                            >
                                <DeleteOutlined />
                            </Button>
                        )}
                    />
                </Table>
            </List>
            <Modal
                title="Bạn chắc chắn muốn xóa role này ?"
                open={visible}
                onCancel={handleCancel}
                okButtonProps={{
                    disabled: !compareName,
                    onClick: handleConfirmDeleteRole,
                }}
            >
                <p>Cẩn trọng khi xóa role, dữ liệu sẽ không thể khôi phục</p>
                <p>
                    Tổng số user ảnh hưởng:{' '}
                    <span style={{ fontWeight: '600', color: 'red' }}>
                        {roleConfirm.userCount}
                    </span>
                </p>
                <p>
                    Tổng số rule ảnh hưởng:{' '}
                    <span style={{ fontWeight: '600', color: 'red' }}>
                        {roleConfirm.ruleCount}
                    </span>
                </p>
                <Input
                    onPaste={(e) => e.preventDefault()}
                    value={roleConfirm.nameConfirm}
                    onChange={handleChangeName}
                    placeholder="Nhập tên role để xác nhận"
                    style={{ paddingBlock: '8px' }}
                />
            </Modal>
            <Drawer open={isOpen} onClose={closeDrawer} title={'Thêm role'}>
                <Form {...formCreate.formProps} layout="vertical">
                    <Form.Item
                        label={'Tên role'}
                        name={['name']}
                        rules={[
                            {
                                required: true,
                                message: 'Tên role không được để trống',
                            },
                            {
                                pattern: /^[a-z]+$/g,
                                message: 'Tên role là ký tự a-z',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <SaveButton
                        {...formCreate.saveButtonProps}
                        icon={false}
                        style={{ width: '100%', marginTop: '4px' }}
                        type="primary"
                    >
                        Thêm
                    </SaveButton>
                </Form>
            </Drawer>
        </div>
    );
};

export default Roles;
