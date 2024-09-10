import { RuleByRole } from '@/types/rule';
import { useUpdate } from '@refinedev/core';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useCallback, useState } from 'react';

type FormRule = {
    id: number;
    name: string;
    accessType: string;
    isPrivate: boolean;
    roles: number[];
};

export const useEditRules = () => {
    const [form, setForm] = useState<FormRule[]>([]);

    const updateForm = useCallback(
        (id: number, updateFn: (item: FormRule) => FormRule) => {
            setForm((prev) =>
                prev.map((item) => (item.id === id ? updateFn(item) : item)),
            );
        },
        [],
    );

    const handleChangeRoles = useCallback(
        (id: number) => (roles: number[]) => {
            updateForm(id, (item) => ({ ...item, roles }));
        },
        [updateForm],
    );

    const handleAddEdit = (rule: RuleByRole) => () => {
        setForm((prev) => {
            const existingIndex = prev.findIndex((item) => item.id === rule.id);
            if (existingIndex !== -1) {
                return prev.filter((item) => item.id !== rule.id);
            }
            return [
                ...prev,
                {
                    id: rule.id,
                    name: rule.name,
                    accessType: rule.accessType,
                    isPrivate: rule.isPrivate,
                    roles: rule.roles.map((role) => role.id),
                },
            ];
        });
    };

    const checkEdit = useCallback(
        (id: number) => form.some((item) => item.id === id),
        [form],
    );

    const handleChangePrivate = useCallback(
        (id: number) => (event: CheckboxChangeEvent) => {
            updateForm(id, (item) => ({
                ...item,
                isPrivate: event.target.checked,
            }));
        },
        [updateForm],
    );

    const getRule = useCallback(
        (id: number) => form.find((item) => item.id === id) || null,
        [form],
    );

    const handleChangeAccessType = (id: number) => (value: string) => {
        setForm((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    return { ...item, accessType: value };
                }
                return item;
            }),
        );
    };

    const resetForm = useCallback(() => setForm([]), []);
    const onUpdate = (id: number, fUpdate: (data: FormRule) => void) => {
        const data = form.find((item) => item.id === id);
        setForm((prev) => prev.filter((item) => item.id !== id));
        data && fUpdate(data);
    };
    return {
        form,
        handleChangeRoles,
        handleAddEdit,
        checkEdit,
        handleChangePrivate,
        getRule,
        resetForm,
        handleChangeAccessType,
        onUpdate,
    };
};

export const useEditRuleApi = () => {
    const updateRules = useUpdate({
        resource: 'rule',
        successNotification: {
            message: 'Success',
            description: 'Rule updated successfully',
            type: 'success',
        },
        meta: {
            method: 'put',
        },
    });
    return { updateRules };
};
