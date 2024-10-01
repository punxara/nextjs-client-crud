import {CssBaseline, GeistProvider, Page, Tabs} from "@geist-ui/core";
import Social from "./social/social";
import {AtSign, Film} from "@geist-ui/icons";
export default function Home() {
  return (
      <GeistProvider>
          <CssBaseline />
          <Page>
              {/*<Page.Header>*/}
                  {/*<h2>Header</h2>*/}
              {/*</Page.Header>*/}
              {/*<Page.Content>*/}
                  <Tabs initialValue="1" align="center" leftSpace={0}>
                      <Tabs.Item label={<><Film /> Projects</>} value="1">
                          projects work
                      </Tabs.Item>
                      <Tabs.Item label={<><AtSign /> Socials </>} value="2">
                          <Social/>
                          {/*<Text mt={0}>The Components of React looks very cool.</Text>*/}
                      </Tabs.Item>
                  </Tabs>
              {/*</Page.Content>*/}
              {/*<Page.Footer>*/}
                  {/*<h2>Footer</h2>*/}
              {/*</Page.Footer>*/}
          </Page>
      </GeistProvider>
  );
}
