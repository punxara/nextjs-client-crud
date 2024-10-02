import {Button, ButtonGroup, Card, Grid, Input, Note, Spacer, Table} from "@geist-ui/core";
import {AtSign, Edit, Link, Save, Trash2, User} from "@geist-ui/icons";
import {useEffect, useState} from "react";
import {save, getAll, remove, update} from './social-service';

export default function Social() {
    const [platform, setPlatform] = useState("");
    const [username, setUsername] = useState("");
    const [link, setLink] = useState("");
    const [dataList, setData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [note, setNote] = useState({type: '', message: '', visible: false});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const socials = await getAll();
                setData(socials);
            } catch (error) {
                setNote({type: 'error', message: error.message, visible: true});
            }
        };
        fetchData();
    }, []);

    async function deleteItem(e, id) {
        e.preventDefault();
        try {
            await remove(id);
            setData(prevData => prevData.filter(item => item.id !== id));
            setNote({type: 'success', message: 'Successfully deleted.', visible: true});
        } catch (error) {
            setNote({type: 'error', message: error.message, visible: true});
        }
    }

    async function editItem(e, id, dataRow) {
        e.preventDefault();
        setEditId(id);
        setPlatform(dataRow.platform);
        setUsername(dataRow.username);
        setLink(dataRow.link);
        setIsEdit(true);
    }

    async function saveItem(e) {
        e.preventDefault();
        const dataToSave = {platform, username, link};
        try {
            if (isEdit) {
                await update(editId, dataToSave);
                setData(prevData => prevData.map(item => item.id === editId ? { ...item, ...dataToSave } : item));
                setNote({type: 'success', message: 'Successfully updated.', visible: true});
            } else {
                const response = await save(dataToSave);
                setData(prevData => [...prevData, response]);
                setNote({type: 'success', message: 'Successfully created.', visible: true});
            }
            resetForm();
        } catch (error) {
            setNote({type: 'error', message: error.message, visible: true});
        }
    }

    const resetForm = () => {
        setPlatform("");
        setUsername("");
        setLink("");
        setIsEdit(false);
        setEditId(null);
    };

    const renderAction = (id, rowData) => {
        return (
            <ButtonGroup>
                <Button icon={<Edit color="blue"/>}
                        onClick={(e) => editItem(e, rowData.id, rowData)}
                ></Button>
                <Button icon={<Trash2 color="red"/>}
                        onClick={(e) => deleteItem(e, rowData.id)}
                ></Button>
            </ButtonGroup>
        );
    };

    return (
        <>
            <Grid.Container gap={1} justify={"center"}>
                <Grid xs={24} sm={24} md={4}>
                    <form>
                        <Input icon={<AtSign/>} placeholder="Platform" value={platform}
                               onChange={(e) => setPlatform(e.target.value)}
                               name="platform" id="platform"/>
                        <Spacer h={0.5}/>
                        <Input icon={<User/>} placeholder="Username" value={username}
                               onChange={(e) => setUsername(e.target.value)}
                               name="username" id="username"/>
                        <Spacer h={0.5}/>
                        <Input icon={<Link/>} placeholder="Profile Link" value={link}
                               onChange={(e) => setLink(e.target.value)}
                               name="link" id="link"/>
                        <Spacer h={0.5}/>
                        <Button width={'100%'} type={'success'} ghost icon={<Save/>} onClick={saveItem}
                                disabled={!(platform.length > 0 && username.length > 0 && link.length > 0)}
                        >{isEdit ? 'Update' : 'Save'}</Button>
                         {/*{note.visible && <Note label={false} type={note.type}>{note.message}</Note>}*/}
                    </form>
                </Grid>

                <Grid xs={24} sm={24} md={20}>
                    <Card width={'100%'}>
                        <Table data={dataList} onChange={value => setData(value)}>
                            <Table.Column prop="platform" label="Platform"/>
                            <Table.Column prop="username" label="Username"/>
                            <Table.Column prop="link" label="Profile Link"/>
                            <Table.Column prop="operation" label="Action" width={150} render={renderAction}/>
                        </Table>
                    </Card>
                </Grid>
            </Grid.Container>
        </>
    );
}
