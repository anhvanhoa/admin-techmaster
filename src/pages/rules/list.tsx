import { List } from '@/components/crud/list';
import { Role } from '@/types/global';
import { Button, Checkbox, Select, Space, Table } from 'antd';
import SelectRole from './components/SelectRole';
import { RuleByRole } from '@/types/rule';
import { CloseOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import GroupButton from './components/GroupButton';
import { accessTypes, methods, status } from '@/constants/filter';
import useServices from '@/hooks/rule/services';
import useRolesExcludeAdmin from '@/hooks/role/rolesExcludeAdmin';
import { optionAccessTypes } from '@/constants/selectData';
import useRules from '@/hooks/rule/rules';
import { useEditRuleApi, useEditRules } from '@/hooks/rule/editRules';

const Rules = () => {
    const { tableRule } = useRules();
    const { filterServices } = useServices();
    const { filterRoles } = useRolesExcludeAdmin();
    const {
        checkEdit,
        getRule,
        handleAddEdit,
        handleChangePrivate,
        handleChangeRoles,
        handleChangeAccessType,
        onUpdate,
    } = useEditRules();

    const { updateRules } = useEditRuleApi();

    const handleUpdate = (id: number) => async () => {
        onUpdate(id, (data) =>
            updateRules
                .mutateAsync({
                    id: data.id,
                    values: data,
                })
                .then(() => tableRule.tableQuery.refetch()),
        );
    };

    return (
        <div>
            <List breadcrumb={false} headerButtons={<GroupButton />}>
                <Table {...tableRule.tableProps}>
                    <Table.Column
                        dataIndex="id"
                        title="ID"
                        sorter={(a: RuleByRole, b: RuleByRole) => a.id - b.id}
                    />
                    <Table.Column
                        dataIndex="service"
                        title="Service"
                        filters={filterServices}
                        onFilter={(value, record) => record.service === value}
                    />
                    <Table.Column dataIndex="path" title="Path" />
                    <Table.Column
                        dataIndex="method"
                        title="Method"
                        filters={methods}
                        onFilter={(value, record) => record.method === value}
                    />
                    <Table.Column
                        dataIndex="accessType"
                        title="Access Type"
                        filters={accessTypes}
                        onFilter={(value, record) =>
                            record.accessType === value
                        }
                        render={(accessType: string, rule: RuleByRole) => {
                            const value =
                                getRule(rule.id)?.accessType ?? accessType;
                            return (
                                <Select
                                    style={{
                                        pointerEvents: !checkEdit(rule.id)
                                            ? 'none'
                                            : 'auto',
                                        opacity: !checkEdit(rule.id) ? 0.9 : 1,
                                        width: 120,
                                    }}
                                    value={value}
                                    onChange={handleChangeAccessType(rule.id)}
                                    options={optionAccessTypes}
                                />
                            );
                        }}
                    />
                    <Table.Column
                        dataIndex="isPrivate"
                        title="Is Private"
                        filters={status}
                        onFilter={(value, record) => record.isPrivate === value}
                        render={(isPrivate: boolean, rule: RuleByRole) => (
                            <Checkbox
                                style={{
                                    pointerEvents: !checkEdit(rule.id)
                                        ? 'none'
                                        : 'auto',
                                    opacity: !checkEdit(rule.id) ? 0.9 : 1,
                                }}
                                checked={
                                    getRule(rule.id)?.isPrivate ?? isPrivate
                                }
                                onChange={handleChangePrivate(rule.id)}
                            />
                        )}
                    />
                    <Table.Column
                        dataIndex="roles"
                        title="Roles"
                        filters={filterRoles}
                        onFilter={(value, record) => {
                            if (value === 'admin') {
                                return true;
                            }
                            return record.roles.some(
                                (role) => role.name === value,
                            );
                        }}
                        render={(rolesData: Role[], rule: RuleByRole) => {
                            const roleSelected = rolesData.map(
                                (role) => role.id,
                            );
                            return (
                                <SelectRole
                                    value={
                                        getRule(rule.id)?.roles || roleSelected
                                    }
                                    onChange={handleChangeRoles(rule.id)}
                                    disabled={!checkEdit(rule.id)}
                                />
                            );
                        }}
                    />
                    <Table.Column
                        title="Actions"
                        render={(rule: RuleByRole) => {
                            return (
                                <Space>
                                    {checkEdit(rule.id) && (
                                        <Button
                                            onClick={handleUpdate(rule.id)}
                                            type="primary"
                                        >
                                            <SaveOutlined />
                                        </Button>
                                    )}
                                    <Button
                                        type="dashed"
                                        onClick={handleAddEdit(rule)}
                                        danger={checkEdit(rule.id)}
                                    >
                                        {checkEdit(rule.id) ? (
                                            <CloseOutlined />
                                        ) : (
                                            <EditOutlined />
                                        )}
                                    </Button>
                                </Space>
                            );
                        }}
                    />
                </Table>
            </List>
        </div>
    );
};

export default Rules;
