import { Button, ButtonGroup, Card, Grid, Input, Spacer } from "@geist-ui/core";
import { AtSign, Link, Save, User } from "@geist-ui/icons";
import { useState } from "react";
import { save } from './social-service';

export default function Social() {
    const [platform, setPlatform] = useState("");
    const [username, setUsername] = useState("");
    const [link, setLink] = useState("");

    async function submitForm(e) {
        e.preventDefault();
        const data = { platform, username, link };
        try {
            const response = await save(data);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Grid.Container gap={2}>
            <Grid width="100%">
                <form>
                    <Card>
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
                        <ButtonGroup>
                            <Button type="button" onClick={() => {
                                setPlatform("");
                                setUsername("");
                                setLink("");
                            }}>Reset</Button>
                            <Button icon={<Save />} onClick={submitForm}>Save</Button>
                        </ButtonGroup>
                    </Card>
                </form>
            </Grid>
        </Grid.Container>
    );
}
