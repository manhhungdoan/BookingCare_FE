// const ModalAddUser = (props) => {
//     const { open } = props;
//     const [confirmLoading, setConfirmLoading] = useState(false);
//     const [modalText, setModalText] = useState('Content of the modal');

//     const handleOk = () => {
//         setModalText('The modal will be closed after two seconds');
//         setConfirmLoading(true);
//         setTimeout(() => {
//             setOpen(false);
//             setConfirmLoading(false);
//         }, 2000);
//     };

//     const handleCancel = () => {
//         console.log('Clicked cancel button');
//         setOpen(false);
//     };
//     return (
//         <Modal
//             title="Title"
//             open={open}
//             onOk={handleOk}
//             confirmLoading={confirmLoading}
//             onCancel={handleCancel}
//         >
//             <Row>
//                 <
//             </Row>
//         </Modal>
//     )
// }