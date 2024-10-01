import { Button, ButtonGroup, Card, Grid, Input, Spacer } from "@geist-ui/core";
import { AtSign, Link, Save, User } from "@geist-ui/icons";
import axios from "axios";
import { useState } from "react";

export default function Social() {
    const [platform, setPlatform] = useState("");
    const [username, setUsername] = useState("");
    const [link, setLink] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:3500/social', {
            platform: platform,
            username: username,
            link: link,
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
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
                            <Button icon={<Save />} onClick={handleSubmit}>Save</Button>
                        </ButtonGroup>
                    </Card>
                </form>
            </Grid>
        </Grid.Container>
    );
}
