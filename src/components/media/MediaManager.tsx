import { Button, Col, Modal, Pagination, Row, Typography } from 'antd';
import React from 'react';
import MediaTitle from './MediaTitle';

type PropsMediaManager = {
    onClose: () => void;
};

const MediaManager: React.FC<PropsMediaManager> = ({ onClose }) => {
    return (
        <Modal
            width={1200}
            title={<MediaTitle />}
            open
            closeIcon={false}
            onCancel={onClose}
            footer={
                <div>
                    <Pagination align="center" defaultCurrent={1} total={50} />
                </div>
            }
        >
            <Row style={{ margin: '12px 0' }} gutter={{ sm: 8 }}>
                {/* <Col span={4}>
                    <Button
                        type='dashed'
                        style={{ width: '100%', height: '100%', aspectRatio: '1/1' }}
                    >
                        <FileImageOutlined style={{ fontSize: '32px' }} />
                    </Button>
                </Col> */}
                <Col span={4}>
                    <div>
                        <img
                            style={{
                                aspectRatio: '1/1',
                                objectFit: 'cover',
                                borderRadius: '8px',
                            }}
                            width={'100%'}
                            src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
                        />
                        <Typography.Text
                            style={{ padding: '4px', display: 'block' }}
                        >
                            Hình ảnh số 1
                        </Typography.Text>
                        <div>
                            <Button></Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Modal>
    );
};

export default MediaManager;
