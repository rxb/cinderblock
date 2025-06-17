# Notes about components

One difference with Cinderblock Design System compared to many is that it's not just about visible elements like buttons, avatars, and form inputs (though those are here too). There are many elements that explicitly exist to provide space and structure for the visible elements. 

Space and positioning is almost never explicitly defined inline (except in special tweaky situations). Space and positioning comes from the structure of the page/screen. Here are the components/elements that create that structure.

<Page> is not defined here in the components, but it is the overall wrapper of the screen. There is only one. It's like the body tag.

<Stripe> is the outermost structure. There is at least one, but there can be more than one. It goes edge to edge of the screen and top to bottom (or until the next stripe). It is the visible background of the screen. Sometimes a screen might but cut horizontally (like a footer) or vertically (like a sidebar). Then you could have two (or more stripes). A stripe is an HTML "Article" level element. 

<Section> is just inside stripe. There is always at least one section, but there can be multiple sections in each stripe. Subsequent sections, if they need headers of their own, would get sectionHeader / H2-equivalents. Sections are HTML "Section" level element. 

<Chunk> is the normal ordinary space between elemtents so they don't touch each other. Visible elements don't handle their own space (with few expections), it is the structural elements like these that handle the space. Chunk is the space between two paragraphs stacked, it's the space between two images stacked, it's the space between form elements stacked.

Here is a sample dummy page structure to see how the elements fit together.

<Page>
   <Stripe>
      <Section>
         <Chunk>
            <Text type="pageHead">Here's the title</Text>
         </Chunk>
         <Chunk>
            <Text>Here's a nice paragraph... imagine a whole paragraph</Text>
         </Chunk>
         <Chunk>
            <Text>Here's a nice paragraph... imagine a whole paragraph</Text>
         </Chunk>
      </Section>
      <Section>  
         <Chunk>
            <Text type="sectionHead"></Text>
         </Chunk>
      </Section>
   </Stripe>
   <Stripe style={{backgroundColor: "gray"}}>
      <Section>
         <Chunk>
            <Text type="sectionHead">Other things you might like...</Text>
         </Chunk>
         <Chunk>
            <Text>Thing one</Text>
         </Chunk>
         <Chunk>
            <Text>Thing one</Text>
         </Chunk>
         <Chunk>
            <Text>Thing three</Text>
         </Chunk>                  
      </Section>
   </Stripe>
</Page>


<Flex> when it's necessary to position elements in a row (or have a dynamic arrangement from columns to rows based on screen width), the components <Flex> and <FlexItem> are used to wrap the elements in question. The default Flex Direction is row. There are many options for how to configure the flex layout found in the component. It is a subset of full flexbox functionality. Here is a dummy example. 

<Stripe>
   <Section>
      <Flex>
         <FlexItem>
            <Chunk>
               <Avatar source={{uri: "http://bob.com/bob.png"}}>
            </Chunk>
         </FlextItem>
         <FlexItem>
            <Chunk>
               <Text weight="strong">My name is Larry</Text>
               <Text>I'm a cool guy</Text>
            </Chunk>
         </FlextItem>
      </Flex>
   </Section>
</Stripe>