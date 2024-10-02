import { Button, ButtonGroup, Card, Grid, Input, Note, Spacer, Table } from "@geist-ui/core";
import { AtSign, Edit, Link, Save, Trash2, User } from "@geist-ui/icons";
import { useEffect, useState } from "react";
import { save, getAll, deleteItem } from './social-service';

export default function Social() {
    const [platform, setPlatform] = useState("");
    const [username, setUsername] = useState("");
    const [link, setLink] = useState("");
    const [data, setData] = useState([]);
    const [note, setNote] = useState({ type: '', message: '', visible: false });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const socials = await getAll();
                setData(socials);
            } catch (error) {
                setNote({ type: 'error', message: error.message, visible: true });
            }
        };
        fetchData();
    }, []);

    const renderAction = (id, rowData) => {
        return (
            <ButtonGroup>
                <Button icon={<Edit color="blue" />}></Button>
                <Button
                    icon={<Trash2 color="red" />}
                    onClick={(e) => deleteItemHandler(e, rowData.id)}
                ></Button>
            </ButtonGroup>
        );
    };

    async function deleteItemHandler(e, id) {
        e.preventDefault();
        try {
            await deleteItem(id);
            setData(prevData => prevData.filter(item => item.id !== id));
            setNote({ type: 'success', message: 'Successfully deleted.', visible: true });
        } catch (error) {
            setNote({ type: 'error', message: error.message, visible: true });
        }
    }

    async function submitForm(e) {
        e.preventDefault();
        const dataToSave = { platform, username, link };
        try {
            const response = await save(dataToSave);
            setData(prevData => [...prevData, response]);
            setNote({ type: 'success', message: 'Successfully created.', visible: true });
            setPlatform("");
            setUsername("");
            setLink("");
        } catch (error) {
            setNote({ type: 'error', message: error.message, visible: true });
        }
    }

    return (
        <>
            <Grid.Container gap={1} justify={"center"}>
                <Grid xs={24} md={4} height={15}>
                    <form>
                        <Input
                            icon={<AtSign />}
                            placeholder="Platform"
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            name="platform"
                            id="platform"
                        />
                        <Spacer h={0.5} />
                        <Input
                            icon={<User />}
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            name="username"
                            id="username"
                        />
                        <Spacer h={0.5} />
                        <Input
                            icon={<Link />}
                            placeholder="Profile Link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            name="link"
                            id="link"
                        />
                        <Spacer h={0.5} />
                        <Button width={'100%'} type={'success'} ghost icon={<Save />} onClick={submitForm}>Save</Button>
                        {/*{note.visible && <Note label={false} type={note.type}>{note.message}</Note>}*/}
                    </form>
                </Grid>

                <Grid xs={24} md={20}>
                    <Card width={'100%'}>
                        <Table data={data} onChange={value => setData(value)}>
                            <Table.Column prop="platform" label="Platform" />
                            <Table.Column prop="username" label="Username" />
                            <Table.Column prop="link" label="Profile Link" />
                            <Table.Column
                                prop="operation"
                                label="Action"
                                width={150}
                                render={renderAction}
                            />
                        </Table>
                    </Card>
                </Grid>
            </Grid.Container>
        </>
    );
}
